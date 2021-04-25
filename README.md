# BE structure readme

A few things to note in the project:
* **[Github Actions Workflows](#)** - Pre-configured Github Actions to run automated builds and publish image to Github Packages
* **[Dockerfile](#)** - Dockerfile to generate docker builds.
* **[docker-compose](#)** - Docker compose script to start service in production mode.
* **[Containerized Mongo for development](#development)** - Starts a local mongo container with data persistence across runs.
* **[Mongo Connection Helper](#)** - A helper class to connect to MongoDB reliably.
* **Joi** - For declarative payload validation
* **[Middleware for easier async/await](#)** - Catches errors from routes and throws them to express error handler to prevent app crash due to uncaught errors.
* **[OpenAPI 3.0 Spec](#)** - A starter template to get started with API documentation using OpenAPI 3.0. This API spec is also available when running the development server at `http://localhost:3000/dev/api-docs`
* **[.env file for configuration](#environment)** - Change server config like app port, mongo url etc
* **[Winston Logger](#logging)** - Uses winston as the logger for the application.
* **ESLINT** - ESLINT is configured for linting.
* **Jest** - Using Jest for running test cases

## Installation

#### 1. Clone this repo

```
$ git clone  repo...
$ cd {folder}
```

#### 2. Install dependencies
* **[Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)**
* Install dependencies:
```
$ npm install -g pm2 (if pm2 not installed yet)
$ npm install -g yarn (if yarn not installed yet)
$ npm install -g serverless
$ npm install -g serverless-offline
$ yarn install
```
* Config serverless:
```
$ aws configure
```
then load the content map to each field in `new_user_credentials-2.csv` to the config (request to have the file).
## Development

### Start dev server
Starting the dev server also starts MongoDB as a service in a docker container using the compose script at `docker-compose.dev.yml`.
```
$ yarn dev
```
### Start dev serverless
```
$ yarn dev-sls
```
Running the above commands results in
* 🌏**API Server** running at `http://localhost:3000`
* ⚙️**Swagger UI** at `http://localhost:3000/dev/api-docs`
* 🛢️**MongoDB** running at `mongodb://localhost:27017`

## Packaging and Deployment
#### 1. Build and run

```
$ yarn build & yarn start
```

---

## Environment
To edit environment variables, create a file with name `.env` and copy the contents from `.env.default` to start with.

| Var Name  | Type  | Default | Description  |
|---|---|---|---|
| NODE_ENV  | string  | `development` |API runtime environment. eg: `staging`  |
|  PORT | number  | `3000` | Port to run the API server on |
|  MONGO_URL | string  | `mongodb://localhost:27017/books` | URL for MongoDB |

## Logging
The application uses [winston](#) as the default logger. The configuration file is at `src/logger.ts`.
* All logs are saved in `./logs` directory and at `/logs` in the docker container.
* The `docker-compose` file has a volume attached to container to expose host directory to the container for writing logs.
* Console messages are prettified
* Each line in error log file is a stringified JSON.

## List service are running:

```
$ pm2 list
```
