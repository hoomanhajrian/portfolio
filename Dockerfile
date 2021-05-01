FROM node:14.16.1

WORKDIR /app

COPY . /app

RUN npm install --force

EXPOSE 3000

CMD ["yarn","start"]
