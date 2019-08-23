<h1 align="center">aegle</h1>
<p align="center" style="font-size: 1.2rem;">Simple healthcheck monitor</p>

## Setup
Run `npm install` in the root folder to install dependencies for both server and client.

Add services to the ./server/services folder, see the `example-service.js` file for example services. You can add and export either a single service, or an array of services. The server will automatically include your services.

For now, valid service types are:

| type    | check |
|--------|------|
| text | Will compare the received text response with the provided healthy value |
| json | Will compare the received json response with the provided healthy value |
| html | For now just checks if the server response is 200 |

### dotenv
The following dotenv variables are available
SERVER_PORT=5000
POLL_TIMER=60000
POLL_TIMEOUT=15000
WEBHOOK="" (insert a Slack channel webhook url if you want to be updated when a service is unhealthy)

Fill in your desired values and copy and rename the `template.env` file to `.env`

## Run
After adding your services, run `npm run start` in the root folder.

| app    | port |
|--------|------|
| server | 5000 |
| client | 8080 |

By default, the services will update every minute.

## Server endpoints
| endpoint         | type | info                        |
|------------------|------|-----------------------------|
| /services        | get  | get all services            |
| /services/update | post | manually trigger update     |
| /healthcheck     | get  | json version of healthcheck |
