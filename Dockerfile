FROM node:lts

ARG PORT=4200

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

RUN npm run build:ssr

EXPOSE $PORT

CMD [ "npm", "run","start-only" ]
