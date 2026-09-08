# Fabio Sicca Portfolio

Static portfolio built with React, TypeScript and Vite. The site contains a
professional introduction, an About page, project cards and dedicated detail
pages for each project.

## Live Website

The deployed website is available at:

<https://d2luz6akrjc31h.cloudfront.net>

The site is served through Amazon CloudFront with an Amazon S3 bucket as its
origin.

## Main Features

- Light and dark themes, initially based on the system preference.
- Responsive layout for desktop, tablet and mobile screens.
- About page with professional profile information and technology stack.
- Project dropdown navigation.
- Dedicated routes for each project:
	- `/projects/mini-dynamodb`
	- `/projects/medical-imaging`
- SVG technology and social icons.
- SPA fallback support for React Router routes.

## Technology Stack

- React 19
- TypeScript
- Vite
- React Router
- CSS
- Amazon S3
- Amazon CloudFront
- Terraform
- GitHub Actions

## Local Development

Install the dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Create a production build locally:

```bash
npm run build
```

Preview the generated build:

```bash
npm run preview
```

Run the linter:

```bash
npm run lint
```

The production files are generated in `dist/`. This is the directory that is
published to S3.

## CI/CD

The repository uses two GitHub Actions workflows.

### Continuous Integration

The workflow in `.github/workflows/ci.yml` runs on pushes and pull requests.
It performs the following checks:

1. Checks out the repository.
2. Installs Node.js 20.
3. Installs dependencies with `npm ci`.
4. Runs `npm run lint`.
5. Runs `npm run build`.

This workflow verifies that the project can be linted and compiled before it is
merged or deployed.

### Continuous Deployment

The workflow in `.github/workflows/deploy.yml` runs after a push to `main` or
`master`:

1. Installs Node.js 22.
2. Installs dependencies with `npm ci`.
3. Generates the production build with `npm run build`.
4. Authenticates with AWS using GitHub Actions OIDC.
5. Synchronizes `dist/` with the `portfolio-fs` S3 bucket.
6. Invalidates the CloudFront cache.

The deployment uses this command:

```bash
aws s3 sync dist/ s3://portfolio-fs --delete
```

The `--delete` option removes files from the bucket that are no longer part
of the current build.

### AWS Authentication

The deployment workflow assumes this IAM role:

```text
arn:aws:iam::497077635613:role/portfolio-manager
```

The workflow uses short-lived credentials through OIDC instead of storing a
long-lived AWS access key in GitHub secrets. The IAM role trust policy must
allow the repository's GitHub Actions workflow to assume it.

## Terraform Infrastructure

The infrastructure is defined in `terraform/main.tf` and uses the AWS
provider in the `sa-east-1` region.

Terraform manages:

- The private S3 bucket `portfolio-fs`.
- The S3 bucket policy that allows read access only to the configured
	CloudFront distribution.
- A CloudFront Origin Access Control using SigV4.
- The CloudFront distribution with HTTPS redirection.
- SPA fallback responses for HTTP 403 and 404 errors.
- CloudFront compression and IPv6 support.
- The configured AWS WAF Web ACL association.

Initialize Terraform:

```bash
cd terraform
terraform init
```

Review the planned changes:

```bash
terraform plan
```

Apply the infrastructure:

```bash
terraform apply
```

Destroying the infrastructure is destructive and should only be done when the
bucket and distribution are no longer needed:

```bash
terraform destroy
```

Terraform state files are ignored by Git because they may contain account and
infrastructure details. Keep the state in a protected remote backend before
using Terraform collaboratively or from CI.

## AWS Deployment Flow

The complete deployment flow is:

```text
Code change
		|
		v
GitHub push to main/master
		|
		v
GitHub Actions: npm ci -> lint -> build
		|
		v
dist/ generated
		|
		v
S3 sync to portfolio-fs
		|
		v
CloudFront cache invalidation
		|
		v
https://d2luz6akrjc31h.cloudfront.net
```

## Important Deployment Notes

- Upload the contents of `dist/`, not the complete source directory, to S3.
- Do not upload `node_modules/`, `.git/` or local Terraform state files.
- The CloudFront 403 and 404 fallback responses are required because the
	application uses `BrowserRouter`.
- If the application is later hosted under a subpath instead of the root of a
	domain, configure Vite's `base` option and update the router deployment
	configuration accordingly.
