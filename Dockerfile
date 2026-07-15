FROM node:18-alpine
WORKDIR /app
COPY package.json server.js index.html brew-guide.html ./
EXPOSE 8080
CMD ["node", "server.js"]
