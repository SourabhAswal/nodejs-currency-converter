# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]

