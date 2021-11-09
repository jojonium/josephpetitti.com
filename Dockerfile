FROM nginx
COPY *.html robots.txt license.txt statistics.sh /usr/share/nginx/html
COPY assets /usr/share/nginx/html/assets
COPY blog /usr/share/nginx/html/blog
COPY images /usr/share/nginx/html/images
COPY styles /usr/share/nginx/html/styles
COPY scripts /usr/share/nginx/html/scripts
COPY webfonts /usr/share/nginx/html/webfonts

COPY ./josephpetitti.com.nginx.conf /etc/nginx/conf.d

EXPOSE 80
