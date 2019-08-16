# aegleJS
Simple healthcheck tool

## Setup
Run `npm install` in the root folder to install dependencies for both server and client.

Add services to to ./server/services folder, see the `example-service.js` file for example services. You can add and export either a single service, or an array of services.

After adding your services, run `npm run start` in the root folder.

The server will run on port 5000

The client will run on port 3000

By default, the services will update every minute.

## Server endpoints
| endpoint         | type | info                        |
|------------------|------|-----------------------------|
| /services        | get  | get all services            |
| /services/update | post | manually trigger update     |
| /healthcheck     | get  | json version of healthcheck |
