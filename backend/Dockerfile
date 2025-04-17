## BASE STAGE ##

FROM node:22 as base
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install -g nodemon && npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

## TEST STAGE ##

FROM base AS test
RUN npm run lint && npm test
