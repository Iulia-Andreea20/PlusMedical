FROM node:16.2

WORKDIR /plusmedical

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD npm run dev