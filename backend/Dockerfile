FROM node:16

# Create app directory
WORKDIR /api

COPY . .
RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]