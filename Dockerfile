FROM nginx:mainline-alpine
RUN apk  update
RUN apk add git python3 bash py3-pip
RUN pip install bs4 requests
COPY ./josephpetitti.com.nginx.conf /etc/nginx/conf.d
COPY ./updater.sh /etc/periodic/15min
COPY ./updater.sh /docker-entrypoint.d/100-updater.sh

RUN crond

EXPOSE 80
