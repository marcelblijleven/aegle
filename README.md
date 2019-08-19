# aegle
Simple healthcheck tool. Add your services and aegle will poll them every minute.

## Setup
Run `npm install` in the root folder to install dependencies for both server and client.

Add services to the ./server/services folder, see the `example-service.js` file for example services. You can add and export either a single service, or an array of services. The server will automatically include your services.

For now, valid service types are:

| type    | check |
|--------|------|
| text | Will compare the received text response with the provided healthy value |
| json | Will compare the received json response with the provided healthy value |
| html | For now just checks if the server response is 200 |

## Run
After adding your services, run `npm run start` in the root folder.

| app    | port |
|--------|------|
| server | 5000 |
| client | 3000 |

By default, the services will update every minute.

## Server endpoints
| endpoint         | type | info                        |
|------------------|------|-----------------------------|
| /services        | get  | get all services            |
| /services/update | post | manually trigger update     |
| /healthcheck     | get  | json version of healthcheck |
