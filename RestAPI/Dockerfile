FROM php:fpm

ENV USR atldd
ENV GEO_GID 208

RUN apt-get update 
RUN apt-get install -y unzip 
RUN apt-get install -y libaio1 
RUN apt-get install wget

WORKDIR /usr/local/bin/tmp

RUN wget  https://download.oracle.com/otn_software/linux/instantclient/218000/instantclient-basiclite-linux.x64-21.8.0.0.0dbru.zip 
RUN wget  https://download.oracle.com/otn_software/linux/instantclient/218000/instantclient-sdk-linux.x64-21.8.0.0.0dbru.zip


ADD instantclient-basic-linux.x64-18.5.0.0.0dbru.zip .
ADD instantclient-sdk-linux.x64-18.5.0.0.0dbru.zip .

RUN unzip instantclient-basic-linux.x64-18.5.0.0.0dbru.zip -d /usr/local/
RUN unzip instantclient-sdk-linux.x64-18.5.0.0.0dbru.zip -d /usr/local/

RUN mv /usr/local/instantclient_18_5 /usr/local/instantclient

ENV LD_LIBRARY_PATH=/usr/local/instantclient


RUN pecl channel-update pecl.php.net
RUN echo 'instantclient,/usr/local/instantclient' | pecl install oci8-3.2.1
RUN docker-php-ext-configure pdo_oci --with-pdo-oci=instantclient,/usr/local/instantclient,12.1

RUN docker-php-ext-install pdo_oci
RUN docker-php-ext-enable  oci8

RUN addgroup --gid $GEO_GID $USR \
    && adduser --disabled-password --gecos "" --gid $GEO_GID --uid $GEO_GID --home /home/$USR $USR 

ADD app.py /var/www/html/
RUN chown -R ${USR}:${USR} /home/${USR}

RUN  apt-get install -y python3

RUN  apt-get install -y python3-pip

RUN pip install flask 
RUN pip install cx_Oracle 

COPY app.py .
COPY entry_point.sh .
WORKDIR  /usr/local/bin/tmp/src/

ADD  src .
WORKDIR  /usr/local/bin/tmp

EXPOSE 8000



RUN cat entry_point.sh | sed 's/\r$//' >entry_point.sh
CMD bash entry_point.sh
