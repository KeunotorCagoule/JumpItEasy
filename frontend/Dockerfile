## BASE STAGE ##

FROM node:22 as base
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN rm -rf node_modules # Ensure no conflicts
EXPOSE 80
CMD ["npm", "run", "dev"]

## TEST STAGE ##

FROM base AS test
RUN npm run lint && npm run test

