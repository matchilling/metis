FROM node:10.15.3-alpine
MAINTAINER Mathias Schilling <m@matchilling.com>

ENV APP_PATH /var/www/current

RUN apk add --no-cache bash make gcc g++ python && \
    rm -rf /var/cache/apk/*

RUN mkdir -p $APP_PATH
WORKDIR $APP_PATH

COPY app/api $APP_PATH
RUN rm -rf node_modules/
RUN npm install

EXPOSE 8080

CMD ["npm", "run", "start"]
