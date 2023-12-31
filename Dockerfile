FROM node:18-alpine

# set /app as work directory
WORKDIR /app

# copy package.json to work directory, so that we install npm dependencies
COPY package.json /app

# install npm dependencies
RUN npm install # OR `RUN yarn install`

# copy your project files to work directory
COPY . /app

# run your app
CMD ["npm", "start"] # OR CMD ['yarn', 'run', 'start']
