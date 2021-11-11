FROM python:3.7-alpine

RUN apk update
RUN apk add git bash
RUN pip install bs4 requests

RUN mkdir -p /usr/share/nginx/html
COPY updater.sh /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

ENTRYPOINT ["bash", "updater.sh"]
