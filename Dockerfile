FROM node:lts-alpine3.19
 
# Create and set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json files
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of the application code to the working directory
COPY . .
 
# Build the application
RUN npm run build
 
# Expose port and start application
EXPOSE 4000
 
CMD [ "node", "dist/main.js" ]