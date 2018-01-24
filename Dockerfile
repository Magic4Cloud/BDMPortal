FROM richarvey/nginx-php-fpm:1.3.9

RUN apk add --no-cache --virtual .build-deps \
    g++ make autoconf yaml-dev

RUN docker-php-ext-install mysqli
RUN pecl install -o -f redis \
    &&  rm -rf /tmp/pear \
    &&  docker-php-ext-enable redis
RUN apk del --purge .build-deps

ADD ./ /var/www/html/
RUN mkdir application/logs || true
