FROM node:16-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the backend port
EXPOSE 3001

# Start the NestJS application
CMD ["node", "dist/main.js"] 