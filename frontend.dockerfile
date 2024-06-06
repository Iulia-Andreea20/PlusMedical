FROM node:21

WORKDIR /plusmedical

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD npm run dev