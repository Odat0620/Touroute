FROM node:14.17.0-alpine3.13

ARG API_URL

ENV WORKDIR=/front/ \
  LANG=C.UTF-8 \
  TZ=Asia/Tokyo \
  HOST=0.0.0.0 \
  API_URL=${API_URL}

WORKDIR ${WORKDIR}

COPY package.json ${WORKDIR}
COPY yarn.lock ${WORKDIR}

RUN yarn install
