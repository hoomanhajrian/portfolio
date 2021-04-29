FROM node:14.16.1

WORKDIR /app

COPY ./package.json /app

RUN yarn install 

EXPOSE 3000

CMD ["yarn","start"]
