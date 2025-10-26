FROM nginx:mainline-alpine
RUN apk  update
RUN apk add git python3 bash py3-pip
RUN apk add py3-beautifulsoup4 py3-requests
COPY ./josephpetitti.com.nginx.conf /etc/nginx/conf.d/default.conf
COPY ./updater.sh /etc/periodic/15min
COPY ./updater.sh /docker-entrypoint.d/100-updater.sh
COPY ./start-crond.sh /docker-entrypoint.d/101-start-crond.sh

EXPOSE 80
