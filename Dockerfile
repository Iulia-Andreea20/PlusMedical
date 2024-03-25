FROM node:21

WORKDIR /plusmedical

COPY package*.json ./

RUN npm install
RUN apt-get update \
    && apt-get install -y \
        apt-utils \
        nano \
        unzip \
        software-properties-common

COPY . .

EXPOSE 3000

CMD npm run dev