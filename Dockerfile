# pull official base image
FROM node:12

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
COPY .env ./
COPY tsconfig.json ./
RUN yarn 
RUN yarn add react-scripts

# add app
COPY . ./

# start app
CMD ["yarn", "run" ,"start"]