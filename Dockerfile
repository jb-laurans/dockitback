# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application (front)
RUN npm run build

# Build the server (back)
RUN npm run build:server

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built assets from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server

# Expose the port the app runs on
EXPOSE 3001

# Start the compiled server
CMD ["node", "dist/server/index.js"]

# Pas d'ENTRYPOINT ni de script custom, la commande est gérée par docker-compose 