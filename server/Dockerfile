# server/Dockerfile
FROM node:14

# Set the working directory inside the container to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to /usr/src/app
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your server application to /usr/src/app
COPY server/ .

# Your app binds to port 5000 so use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 5000

# Define the command to run your app
CMD ["node", "server.js"]

