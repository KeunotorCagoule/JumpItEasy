## BASE STAGE ##

FROM node:22 AS base
WORKDIR /usr/src/app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install -g nodemon && npm ci
COPY frontend/ .
RUN rm -rf node_modules # Ensure no conflicts
EXPOSE 80
CMD ["npm", "run", "dev"]

## LINT STAGE ##

FROM base AS lint
RUN npm run lint

## TEST STAGE ##

FROM base AS test
RUN npm run test
