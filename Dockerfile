FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . ./server

# Install netcat for healthcheck
RUN apk add --no-cache netcat-openbsd

# Set environment variables
ENV NODE_ENV=production
ENV DB_HOST=db
ENV DB_PORT=5432

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD nc -z db 5432 || exit 1

# Expose port
EXPOSE 3001

# Start the server
CMD ["npx", "nodemon"] 