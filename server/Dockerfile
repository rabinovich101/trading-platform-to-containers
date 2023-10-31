FROM node:18-alpine
WORKDIR "/app"
COPY ./package*.json ./
RUN yarn
COPY . .
EXPOSE 3003
CMD ["yarn", "run", "start"]