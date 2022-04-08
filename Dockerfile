FROM node:14.16.1

WORKDIR /app

COPY . /app

RUN yarn

EXPOSE 3005

CMD ["yarn","start"]

# docker run -d -p 80:3000 hoomandock/portfolio
#  docker build --pull --rm -f "Dockerfile" -t portfolio:latest "."