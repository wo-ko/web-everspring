FROM node:22.16.0-alpine AS deps
WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache openssl && npm ci

FROM node:22.16.0-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:22.16.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nextjs\
  && adduser --system --uid 1001 nextjs_user

# อัปเดต package ใน alpine
RUN apk update && apk upgrade

COPY --from=builder --chown=nextjs_user:nextjs /app/package*.json ./
COPY --from=builder --chown=nextjs_user:nextjs /app/.next ./.next
COPY --from=builder --chown=nextjs_user:nextjs /app/public ./public
RUN npm install --only=production

EXPOSE 3000
CMD ["npm", "start"]
