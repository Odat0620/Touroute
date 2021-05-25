FROM node:16.2.0-alpine3.13

ENV WORKDIR=/front/ \
  LANG=C.UTF-8 \
  TZ=Asia/Tokyo \
  HOST=0.0.0.0

WORKDIR ${WORKDIR}

COPY package.json ${WORKDIR}
COPY yarn.lock ${WORKDIR}

RUN yarn install
