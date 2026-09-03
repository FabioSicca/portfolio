# Trabajo práctico 3 - Mini-DynamoDB

# Levantar zookeeper con docker

Correr en una terminal:
`docker run --name zookeeper -p 2181:2181 zookeeper`

Para conectarse:
`docker exec -it zookeeper zkCli.sh`

Para correr el contenedor si estaba detenido:
`docker start zookeeper`

Para ver los nodos (Una vez dentro de zookeeper):
`ls /`

# Ejecución

Para la ejecución, se pueden levantar cada request router y datanode escribiendo los siguientes comandos en los directorios correspondientes:

*Zookeeper debe estar levantado antes de levantar los request routers, datanodes y el cliente*

En `src/router`, para levantar un router:

`go run . -addr=<nro_puerto>`

En `src/datanode`, para levantar un datanode:

`go run . -addr=<nro_puerto>` o también `VERBOSE=1 go run . -addr=<nro_puerto>` para ver la salida de RAFT

En `src/client`, para levantar un cliente:

`go run .`


## Construcción del protocolo gRPC

Para construir el protocolo gRPC se debe ejecutar en la raíz del repositorio:

`./make proto <service>`

Donde service es el nombre del protocolo a construir, por ejemplo:

`./make proto router`
`./make proto datanode`
`./make proto raft`

Luego de realizar cambios en algún archivo de extensión `.proto` se debe volver a ejecutar la misma instrucción para que se vuelva a traducir el protocolo gRPC a lenguaje Go.

# Tests

Se pueden correr los tests ejecutando dentro de los directorios que contienen archivos `_test.go` la directiva `go test`

*Debe estar zookeeper levantado para que funcionen correctamente*

# Información del tp

## Resúmen del objetivo

El objetivo es construir un prototipo funcional que combine los principales componentes que caracterizan a los sistemas modernos de datos distribuidos: **replicación mediante consenso (Raft), particionado de datos (sharding), coordinación distribuida (ZooKeeper) y consistencia configurable.**

## Componentes principales

### Request Router

Es el punto de conexión de un CLI, al levantarse se registra en zookeeper y escucha en el puerto asignado nuevas conexiones de clientes. Tiene como responsabilidades:

- Consultar a ZooKeeper la configuración actual del sistema (tablas, shards y DataNodes).
- Enrutar las operaciones Get, Put y Delete hacia un DataNode.
- Mantener un caché efímero de configuración para reducir la carga sobre ZooKeeper.
- Recuperarse automáticamente ante fallos o reinicios sin necesidad de sincronización adicional, dado su carácter stateless.
- Para las entregas que implementen transacciones, el RequestRouter cumple el rol de TransactionManager e implementa 2 phase commit

### ZooKeeper

Actúa como el servicio de coordinación y configuración del sistema. Es responsable de mantener la configuración global, que incluye:

- La lista de tablas existentes.
- Los rangos de hash asignados a cada shard.
- La asignación de shards a DataNodes (sus direcciones o identificadores).

Para garantizar la consistencia y atomicidad utiliza nodos persistentes y watchers para mantener actualizada la información de las tablas y de las transacciones distribuidas. Además guarda nodos efímeros que contienen las listas de routers disponibles, datanodes disponibles y locks activos.

### Datanodes

Son los nodos que almacenan los datos de los shards. Cada DataNode puede alojar múltiples shards, incluso de tablas distintas. Cada shard mantiene su propia réplica independiente, implementada mediante el algoritmo de consenso Raft, que asegura la consistencia entre réplicas y la durabilidad del estado.

Características clave:

- Implementan Raft con compactación de logs (snapshotting) y persistencia de estado.
- Exponen una API gRPC para recibir las operaciones desde los RequestRouters.
- Rechazan operaciones destinadas a shards que no administran.
- Pueden alojar shards de múltiples tablas simultáneamente.

Para lograr esto, establecimos la siguiente arquitectura de clases:

<img src="./images/Datanode-structure.png" width=70%>

Donde se puede ver que un Datanode contiene varias ShardReplicas y ésta a su vez contiene una instancia de RAFT.

Dado que un datanode escucha en un único puerto, se pueden llegar a recibir mensajes tanto de un RequestRouter como de un peer de Raft, por lo que se decidió que debe entender ambos protocolos.

<img src="./images/Datanode-comunication.png" width=70%>

Además, a diferencia del tp2, ahora los peers de RAFT se encuentran en procesos diferentes, por lo que se tuvo que modificar la forma de comunicación de labrpc a gRPC. Sin embargo, una vez establecido ese cambio se presentó la duda de cómo redirigir los mensajes de un peer hacia el shard correspondiente del datanode receptor (ya que éste contiene varios shards). Finalmente se optó por agregar un campo en los mensajes que contiene el ShardKey, de esta forma el datanode puede redirigir los mensajes recibidos por distintos RAFTs a sus shards y por ende a sus RAFTs correspondientes.

A continuación se muestra un diagrama con todas las tareas que realiza el datanode en su creación para poder garantizar la persistencia de datos y la eliminación de *shards huérfanos*:

<img src="./images/Datanode-creation-2.png" width=70%>


### Cliente CLI

El cliente de línea de comandos (CLI) es la interfaz principal de usuario. Permite ejecutar operaciones sobre el sistema, incluyendo tanto las de datos (Get, Put, Delete) como las administrativas (CreateTable, DeleteTable).

Al levantar un cliente, éste consulta a ZooKeeper por la lista de routers disponibles y establece una conexión con alguno de ellos. Además lanza un watcher sobre esa lista para que en caso de la desconexión del router, se pueda comunicar a uno nuevo (si hay levantado), de forma automática.

## Operaciones

### Create table

A continuación se muestra un diagrama de secuencia de la operación *create table*:

<img src="./images/CreateTable.png">

Se puede ver que la parte a destacar es que una vez que se envía esta operación a los datanodes, recién en este momento se crea la red de RAFT entre ellos. Esto permite que la cantidad de nodos en un principio no sea fija, ya que de todos los levantados, las redes de RAFT se forman tomando 3 o 5 de la lista.

### Put

A continuación se muestra un diagrama de secuencia de la operación *Put*:
<img src="./images/Put.png">

### Get

A continuación se muestra un diagrama de secuencia de la operación *Get*:

<img src="./images/Get.png">

Se puede ver la diferencia entre un get eventual y uno fuertemente consistente; donde en el eventual se puede leer un valor de un nodo que se encuentra desactualizado, mientras que en el fuertemente consistente lee el valor directamente del líder.

### Multiput

A continuación se muestra un diagrama de secuencia de la operación *Put transaccional* o *Multiput*:

<img src="./images/Multiput.png">

### Multiget

A continuación se muestra un diagrama de secuencia de la operación *Get transaccional* o *Multiget*:

<img src="./images/Multiget.png">


# Apéndice

Se deja un diagrama de secuencia del levantamiento de un Datanode para complementar el diagrama mostrado previamente:

<img src="./images/Datanode-creation.png">