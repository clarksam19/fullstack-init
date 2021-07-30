FROM node as build
WORKDIR /usr/src/app
COPY ./client/package.json .
RUN npm install
COPY ./client .
RUN npm run build

FROM clarksam19/node-server:prod AS base

FROM node:lts-alpine
WORKDIR /usr/src/app
COPY --from=base /usr/src/app .
WORKDIR /usr/src/app/local
COPY ./server .
COPY --from=build /usr/src/app/build ./build
CMD ["npm", "start"]