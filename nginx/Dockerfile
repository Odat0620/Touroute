FROM nginx:1.19

ENV LC_ALL ja_JP.UTF-8

RUN apt-get update && apt-get install -y curl \
  apt-utils \
  locales && \
  echo "ja_JP.UTF-8 UTF-8" > /etc/locale.gen && \
  locale-gen ja_JP.UTF-8
RUN rm -f /etc/nginx/conf.d/*

ADD nginx.conf /etc/nginx/nginx.conf
ADD ./conf.d/api.conf /etc/nginx/conf.d/api.conf


EXPOSE 80