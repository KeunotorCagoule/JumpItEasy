## BASE STAGE ##

# Use Node.js as base image
FROM node:22 as base

# Set working directory
WORKDIR /usr/src/app

# Copy package files first (optimizes caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install -g nodemon && npm ci

# Copy rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Use nodemon in development
CMD ["npm", "run", "dev"]

## TEST STAGE ##

FROM base AS test
RUN npm run lint && npm test
