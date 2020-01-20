FROM node:lts

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
RUN npm i -g @angular/cli

RUN npm i -g @nestjs/cli

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 4200

CMD [ "npm", "run","start-only" ]
