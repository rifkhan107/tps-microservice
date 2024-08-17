# Stage 1: Build the application using a Node.js 20.x builder image
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies only
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the application (e.g., compile TypeScript)
RUN npm run build

# Stage 2: Create a lightweight production image using distroless
FROM gcr.io/distroless/nodejs20-debian11 AS production

# Set the working directory in the final image
WORKDIR /usr/src/app

# Copy the production node_modules from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copy the built application code from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the application port
EXPOSE 3000

# Run the application using distroless image
CMD ["dist/main.js"]
