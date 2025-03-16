FROM node:22.14.0-bookworm
LABEL authors="preston sparks"

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev", "--", "--host"]