# Aegle
![](https://github.com/marcelblijleven/aegle/workflows/server-ci/badge.svg)
---
A simple way to monitor healthcheck endpoints

## Quick start
Run `npm install` in the root folder to install dependencies for both server and client.

### Services
Add services to the ./server/services folder, see the `example-service.js` file for example services. You can add and export either a single service, or an array of services. The server will automatically include your services.

Examples
Regular service
```json
{
  "name": "regular-service",
  "url": "http://localhost",
  "healthyValue": { "status": "ok" }
}
```

Dynamic service
```json
{
  "name": "regular-service",
  "url": "http://localhost/{path}",
  "healthyValue": { "status": "ok" },
  "params": {
    "path": ["foo", "bar", "baz"]
  }
}
```

Add the properties of service.params to your url as placeholder, and all combinations will automatically be included in the list of services.


### dotenv
The following dotenv variables are available: SERVER_PORT, POLL_TIMER, POLL_TIMEOUT, WEBHOOK

Fill in your desired values and copy and rename the `template.env` file to `.env`. Insert a Slack channel webhook url if you want to be updated when a service is unhealthy

## Run
After adding your services, run `npm run start` in the root folder.

| app    | port |
|--------|------|
| server | http://localhost:5000 |
| client | http://localhost:8080 |

By default, the services will update every minute.

## Server endpoints
| endpoint         | type | info                        |
|------------------|------|-----------------------------|
| /services        | get  | get all services            |
| /services/update | post | manually trigger update     |
| /healthcheck     | get  | json version of healthcheck |
