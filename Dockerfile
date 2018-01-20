FROM node:carbon

RUN if [ -f package-lock.json ] then rm package-lock.json fi

RUN apt update
RUN apt -y install net-tools dnsutils joe wget 

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

RUN mkdir -p /ng-app
RUN chown node:node /ng-app

# Change directory so that our commands run inside this new directory
WORKDIR /ng-app

# Copy dependency definitions
COPY package*.json /ng-app

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . .

# Expose the port the app runs in
EXPOSE 8080

# Serve the app
CMD ["npm", "start"]
