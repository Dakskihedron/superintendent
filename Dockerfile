FROM node:latest
WORKDIR /usr/src/app
COPY src src/
COPY .env package.json tsconfig.json yarn.lock ./
RUN yarn install && yarn build
CMD ["yarn", "start"]
