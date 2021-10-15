FROM nginx:1.21.3-alpine
WORKDIR /var/www/html

COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./public .
