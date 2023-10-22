FROM nginx:1.25

COPY index.html styles.css /usr/share/nginx/html/
COPY cafe /usr/share/nginx/html/
COPY login /usr/share/nginx/html/
COPY menu /usr/share/nginx/html/
COPY order /usr/share/nginx/html/

COPY default.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /tmp/entrypoint.sh

ENTRYPOINT ["/tmp/entrypoint.sh"]