FROM node:24

WORKDIR /app

# COPY ./src .
COPY . .
RUN corepack enable 

RUN pnpm install 
RUN pnpm prisma generate

EXPOSE 3000

CMD ["pnpm", "run", "start:dev"]