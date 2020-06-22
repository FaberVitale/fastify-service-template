# timestamp service

## Description

Expressjs + typescript + node 14 example server.

## Scripts

- `npm run dev`: starts server in dev mode that restars on ./src changes:
  server should be live in `localhost:5000`, try `http://localhost:5000/api/now`.

- `npm run build`: build for production.

- `npm run start`: starts server in dev mode.

- `npm dev:debug`: starts server in dev mode with debugger attached.

- `npm run test`: runs tests.

## Docker

- build image:`docker build --tag timestamp-service:<tag> .`

- run dockerize app: `docker run --rm -p 5000:5000 timestamp-service:<tag>`

## Requirements

```
"node": "^14.0.0",
"npm": "^6.14.4"
```
