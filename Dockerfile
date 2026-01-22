FROM node:22.16.0-alpine AS deps
WORKDIR /app

COPY package.json ./

RUN  npm i

FROM node:22.16.0-slim AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:22.16.0-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nextjs\
  && adduser --system --uid 1001 nextjs_user

COPY --from=builder --chown=nextjs_user:nextjs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs_user:nextjs /app/package*.json ./
COPY --from=builder --chown=nextjs_user:nextjs /app/.next ./.next
COPY --from=builder --chown=nextjs_user:nextjs /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
