FROM node

WORKDIR /app

COPY package.json .

RUN npm install --legacy-peer-dep

COPY . .

EXPOSE 4000

CMD ["npm", "start"]