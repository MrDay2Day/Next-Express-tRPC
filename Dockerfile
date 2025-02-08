# Use an ARG with a default value
ARG NODE_VERSION=18.19.0
FROM node:${NODE_VERSION}-alpine

# Set a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies with caching and only production dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Change ownership to non-root user
RUN chown -R appuser:appgroup /usr/src/app

# Switch to the non-root user
USER appuser

# Use an ARG with a default value for the exposed port
ARG PORT=3000
EXPOSE ${PORT}

# Use CMD with JSON syntax for better signal handling
CMD ["npm", "run", "start:node"]
