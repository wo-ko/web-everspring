FROM node:22.16.0-alpine

WORKDIR /app

COPY . /app
RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "dev"]