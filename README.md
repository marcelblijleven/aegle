# Aegle

![](https://github.com/marcelblijleven/aegle/workflows/server-ci/badge.svg) [![Greenkeeper badge](https://badges.greenkeeper.io/marcelblijleven/aegle.svg)](https://greenkeeper.io/) [![codecov](https://codecov.io/gh/marcelblijleven/aegle/branch/master/graph/badge.svg)](https://codecov.io/gh/marcelblijleven/aegle)
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
  "name": "dynamic-service",
  "url": "http://localhost/{path}",
  "healthyValue": { "status": "ok" },
  "params": {
    "path": ["foo", "bar", "baz"]
  }
}
```

Add the properties of service.params to your url as placeholder, and all combinations will automatically be included in the list of services.

#### Healthy values and response content
There are several ways to detect if the service is healthy or not. The most easy one is to omit the property `healthyValue` from the service. When this property is not present, the healthcheck function will check if the response status is 'Ok', which means it is in the range of 200 - 299 inclusive.

The other ways to check healthyValue are based on the Content-Type of the response, the following content types are implemented:
* text/plain
* text/html
* application/json

*text/html*
If the Content-Type header of the response is text/html, you can also omit the `healthyValue` property, because the same response.ok will be used.

*text/plain*
If you're service endpoint returns plain text, and the provided Content-Type header of the response is text/plain, you can add a simple string value to the `healthyValue` property, and the healthcheck will check if it matches the response.

*application/json*
If the Content-Type header is application/json, the `healthyValue` property will compare the object that is assigned to the property to the response object.

### dotenv
The following dotenv variables are available: SERVER_PORT, POLL_TIMER, POLL_TIMEOUT, WEBHOOK

Fill in your desired values and copy and rename the `template.env` file to `.env`.

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
