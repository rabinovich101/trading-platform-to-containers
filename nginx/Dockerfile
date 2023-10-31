FROM nginx

# remove default nginx conf file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the nginx.conf file as default conf
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443