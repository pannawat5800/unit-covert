FROM node:12

WORKDIR /usr/app

COPY ["package.json", "package-lock.json*", "./"]
RUN  npm install

COPY . .

RUN chmod +x ./start.sh

# Start the service
CMD ["./start.sh"]
