FROM node:14.4.0-alpine as build-stage

ARG WORKDIR=/home/node/timestamp
ARG CI=true

ENV CI=${CI}
ENV NODE_ENV=development

WORKDIR ${WORKDIR}

COPY . .

RUN npm ci --no-audit && npm run build

FROM node:14.4.0-alpine

ARG WORKDIR=/home/node/timestamp
ARG CI=true

ENV NODE_ENV=production
ENV CI=${CI}

WORKDIR ${WORKDIR}

COPY --chown=node:node --from=build-stage ${WORKDIR} .

USER node

RUN npm ci --no-audit --only=prod

EXPOSE 5000

ENTRYPOINT [ "npm" ]

CMD [ "run", "start" ]