FROM node:8.14.1

WORKDIR /var/www

COPY . /var/www

RUN npm install

CMD ["npm", "start"]