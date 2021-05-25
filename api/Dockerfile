FROM ruby:2.7.3

ENV LANG=C.UTF-8 \
  TZ=Asia/Tokyo \
  WORKDIR=/api/

WORKDIR ${WORKDIR}

RUN apt-get update -qq && \
  apt-get install -y build-essential \
  vim \
  nodejs \
  default-mysql-client


COPY Gemfile* ${WORKDIR}
RUN gem install bundler && bundle install
