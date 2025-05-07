## BASE STAGE ##

FROM node:22 AS base
WORKDIR /usr/src/app
COPY backend/package.json backend/package-lock.json ./
RUN npm install -g nodemon && npm ci
COPY backend/ .
EXPOSE 3000
CMD ["npm", "run", "dev"]

## LINT STAGE ##

FROM base AS lint
RUN npm run lint

## TEST STAGE ##

FROM base AS test
RUN npm run test
