FROM ruby:2.7.3

ARG WORKDIR=/api
ARG DB_HOST
ARG DB_NAME
ARG DB_USERNAME
ARG DB_PASSWORD
ARG HOST
ARG FIREBASE_PROJECT_ID

ENV LANG                C.UTF-8
ENV TZ                  Asia/Tokyo
ENV DB_HOST             ${DB_HOST}
ENV DB_NAME             ${DB_NAME}
ENV DB_USERNAME         ${DB_USERNAME}
ENV DB_PASSWORD         ${DB_PASSWORD}
ENV HOST                ${HOST}}
ENV FIREBASE_PROJECT_ID ${FIREBASE_PROJECT_ID}

WORKDIR ${WORKDIR}

RUN apt-get update -qq && \
  apt-get install -y build-essential \
  vim \
  nodejs \
  default-mysql-client


COPY Gemfile* ${WORKDIR}
RUN gem install bundler && bundle install

COPY . ${WORKDIR}

EXPOSE 3000

CMD ["rails" "server" "-b" "${HOST}"]
