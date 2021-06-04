FROM node:10 AS ui-build
WORKDIR /usr/src/app
COPY CI-CD-Part2/ ./CI-CD-Part2
RUN cd CI-CD-Part2 && npm install @angular/cli && npm install && npm run build

FROM node:10 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app ./
COPY routes ./routes
COPY package*.json .
COPY server.js .
COPY lib ./lib
COPY config.js .
RUN wget https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem
RUN chmod 400 rds-combined-ca-bundle.pem
COPY webpack.config.js .
RUN npm install

EXPOSE 3080

CMD ["node", "server.js"]
