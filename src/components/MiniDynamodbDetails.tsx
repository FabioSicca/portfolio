import type { Project } from '../data/projects'
import DatanodeStructure from '../assets/Datanode-structure.png'
import DatanodeCommunication from '../assets/Datanode-communication.jpeg'
import DatanodeCreation from '../assets/Datanode-creation-2.jpeg'
import ImageContainer from './ImageContainer'

interface MiniDynamodbDetailsProps {
  project: Project
}

function MiniDynamodbDetails({ project }: MiniDynamodbDetailsProps) {
  return (
    <div className="mini-dynamodb-details" lang="en">
      <header className="project-hero project-hero-database">
        <p className="project-eyebrow">Distributed database prototype</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </header>

      <section className="project-intro-section">
        <p className="project-section-label">Project overview</p>
        <h2>A practical exploration of distributed data systems</h2>
        <p>
          The goal of this project was to build a functional prototype that
          combines the core ideas behind modern distributed databases:
          consensus-based replication with Raft, data partitioning through
          sharding, distributed coordination with ZooKeeper and configurable
          consistency guarantees.
        </p>
      </section>

      <section className="database-map" aria-label="Cluster architecture">
        <div className="database-map-label">System architecture</div>
        <div className="database-node database-client">CLI client</div>
        <span className="database-arrow" aria-hidden="true">→</span>
        <div className="database-node database-coordinator">Request Router</div>
        <span className="database-arrow" aria-hidden="true">→</span>
        <div className="database-nodes">
          <div className="database-node">DataNode A</div>
          <div className="database-node">DataNode B</div>
          <div className="database-node">DataNode C</div>
        </div>
      </section>

      <section className="project-detail-section">
        <div className="project-detail-heading">
          <p className="project-section-label">01 / Request Router</p>
          <h2>The stateless entry point for client operations</h2>
        </div>
        <div className="project-detail-copy">
          <p>
            The Request Router is the connection point between the CLI and the
            distributed storage layer. It registers itself with ZooKeeper and
            listens for new client connections.
          </p>
          <ul>
            <li>Reads the current tables, shards and DataNode assignments from ZooKeeper.</li>
            <li>Routes Get, Put and Delete operations to the correct DataNode.</li>
            <li>Keeps an ephemeral configuration cache to reduce coordination overhead.</li>
            <li>Recovers automatically after failures or restarts because it is stateless.</li>
            <li>Acts as a Transaction Manager and coordinates two-phase commit for transactional operations.</li>
          </ul>
        </div>
      </section>

      <section className="project-detail-section">
        <div className="project-detail-heading">
          <p className="project-section-label">02 / ZooKeeper</p>
          <h2>Coordination and global configuration</h2>
        </div>
        <div className="project-detail-copy">
          <p>
            ZooKeeper acts as the coordination and configuration service for
            the cluster. It stores the global view of the database and keeps
            distributed processes informed when that view changes.
          </p>
          <ul>
            <li>Stores the list of available tables.</li>
            <li>Maintains the hash ranges assigned to each shard.</li>
            <li>Tracks the assignment of shards to DataNodes.</li>
            <li>Uses persistent nodes and watchers to keep table and transaction state updated.</li>
            <li>Uses ephemeral nodes for available routers, DataNodes and active locks.</li>
          </ul>
        </div>
      </section>

      <section className="project-detail-section project-detail-section-accent">
        <div className="project-detail-heading">
          <p className="project-section-label">03 / DataNodes</p>
          <h2>Sharded storage with independent Raft replicas</h2>
        </div>
        <div className="project-detail-copy">
          <p>
            DataNodes store the shards that contain the actual key-value data.
            A single DataNode can host multiple shards, including shards from
            different tables. Each shard has its own independent replica group
            managed by Raft, providing consistency between replicas and durable
            state.
          </p>
          <ul>
            <li>Implements Raft log compaction through snapshotting and persistent state.</li>
            <li>Exposes a gRPC API for requests from Request Routers.</li>
            <li>Rejects operations addressed to shards it does not manage.</li>
            <li>Hosts multiple shards and tables in the same process.</li>
          </ul>
        </div>
      </section>

      <ImageContainer caption="DataNode class architecture">
        <img
          src={DatanodeStructure}
          alt="DataNode class architecture diagram"
        />
      </ImageContainer>

      <ImageContainer caption="DataNode creation process">
        <img
          src={DatanodeCreation}
          alt="DataNode creation process diagram"
        />
      </ImageContainer>

      <section className="project-detail-section">
        <div className="project-detail-heading">
          <p className="project-section-label">04 / Protocol boundary</p>
          <h2>One DataNode, two communication protocols</h2>
        </div>
        <div className="project-detail-copy">
          <p>
            Because a DataNode listens on a single port, it may receive both
            requests from a Request Router and messages from a Raft peer. The
            process therefore needs to understand both protocols and route
            each message to the correct internal component.
          </p>
          <p>
            Raft peers run in separate processes, so the project moved from
            labrpc to gRPC. To identify the correct shard inside a DataNode,
            each message carries a ShardKey. The DataNode uses that key to
            forward the message to the corresponding ShardReplica and its Raft
            instance.
        </p>
        </div>
      </section>

      <ImageContainer caption="DataNode communication protocols">
        <img
          src={DatanodeCommunication}
          alt="DataNode communication protocols diagram"
        />
      </ImageContainer>

      <section className="project-detail-section">
        <div className="project-detail-heading">
          <p className="project-section-label">05 / CLI client</p>
          <h2>A client that follows the cluster as it changes</h2>
        </div>
        <div className="project-detail-copy">
          <p>
            The CLI is the primary user interface. It supports data operations
            such as Get, Put and Delete, as well as administrative operations
            such as CreateTable and DeleteTable.
          </p>
          <p>
            When it starts, the client discovers an available Request Router
            through ZooKeeper. It also watches the router list so it can
            connect to another available router if its current connection is
            lost.
        </p>
        </div>
      </section>

      <section className="project-detail-section project-operations">
        <div className="project-detail-heading">
          <p className="project-section-label">06 / Operations</p>
          <h2>From cluster creation to consistent reads</h2>
        </div>
        <div className="project-operation-list">
          <article>
            <span>01</span>
            <h3>Create table</h3>
            <p>
              The Raft network is created when the table creation request
              reaches the DataNodes. This keeps the initial number of processes
              flexible: the system selects three or five available nodes to
              form each replica group.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Put</h3>
            <p>
              A write travels through the client and Request Router to the
              DataNode responsible for the target shard, where Raft replicates
              the operation before it becomes durable.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Get</h3>
            <p>
              Eventual reads may return data from a replica that is not fully
              up to date. Strongly consistent reads contact the current Raft
              leader to guarantee the latest committed value.
            </p>
          </article>
          <article>
            <span>04</span>
            <h3>Multiput and Multiget</h3>
            <p>
              Transactional writes and reads span multiple shards. The Request
              Router coordinates these operations as Transaction Manager using
              two-phase commit.
            </p>
          </article>
        </div>
      </section>

      <section className="project-story-grid project-closing-section">
        <section>
          <p className="project-section-label">Technology</p>
          <div className="project-technologies">
            {project.technologies.map((technology) => (
              <span key={technology} className="project-technology">
                {technology}
              </span>
            ))}
          </div>
        </section>
      </section>
    </div>
  )
}

export default MiniDynamodbDetails