# timestamp service

## Description

Proof of concept of a microservice that runs in [node 14](https://nodejs.org/en/) using the following stack:

- [typescript](https://www.typescriptlang.org/)

- [fastify](https://www.fastify.io/)

- [swagger](https://swagger.io/)

- [jest](https://jestjs.io/)

- [docker](https://www.docker.com/)

- [eslint](https://eslint.org/)

## Scripts

- `npm run dev`: starts server in dev mode that restars on ./src changes:

  - server is be `localhost:5000`, try `http://localhost:5000/api/now`.

  - docs are available on http://localhost:5000/api/now/documentation

- `npm run build`: build for production.

- `npm run start`:starts server in production mode.

- `npm dev:debug`: starts server in dev mode with debugger attached, try `chrome://inspect/#devices` in chrome.

- `npm run test`: runs tests.

## Docker

- build image:`docker build --tag timestamp-service:<tag> .`

- run dockerize app: `docker run --rm -p 5000:5000 timestamp-service:<tag>`

## Requirements

```
"node": "^14.0.0",
"npm": "^6.14.4"
```

## License

[MIT](./LICENSE)
