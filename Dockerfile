FROM node
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY [".env", "package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "trade_history.js"]
