FROM node:18-alpine
WORKDIR "/app"
COPY ./package*.json ./
RUN yarn
COPY . .
EXPOSE 3010
CMD ["yarn", "run", "start"]