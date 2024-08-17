FROM ubuntu
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get -y install imagemagick

ENTRYPOINT ["convert"]

