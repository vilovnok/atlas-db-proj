ARG WORK_DIR=/build

FROM node:16 as builder

ARG WORK_DIR
ENV PATH ${WORK_DIR}/node_modules/.bin:$PATH

RUN mkdir ${WORK_DIR}
WORKDIR ${WORK_DIR}

COPY . ${WORK_DIR}

RUN npm install @angular/cli \
    npm install 

RUN ng build --prod

FROM nginx:latest
ARG WORK_DIR
COPY --from=builder ${WORK_DIR}/dist/atlas-dbmon /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx" , "-g", "daemon off;" ]





