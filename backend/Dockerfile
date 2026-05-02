FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ENV DATABASE_URL=postgresql://user:password@localhost:5432/empresa_db
RUN npx prisma generate
RUN npm run build

EXPOSE 3000
EXPOSE 3001

CMD ["sh", "-c", "npm run start & BFF_PORT=3001 node dist/bff/index.js"]
