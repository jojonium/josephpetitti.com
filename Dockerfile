FROM nginx:mainline-alpine
RUN apk  update
RUN apk add git python3 bash py3-pip
RUN pip install bs4 requests
COPY ./josephpetitti.com.nginx.conf /etc/nginx/conf.d
COPY ./updater.sh /
COPY ./updater.sh /docker-entrypoint.d/100-updater.sh

RUN echo '*/5 * * * * /bin/bash /updater.sh' >> /etc/crontabs/root

EXPOSE 80
