FROM node:16

# Create app directory
WORKDIR /app

COPY . .
RUN npm install



# Bundle app source
EXPOSE 3000
CMD [ "npm", "start" ]