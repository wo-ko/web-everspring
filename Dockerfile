<<<<<<< HEAD
FROM node:22.16.0-alpine AS deps
=======
FROM node:22.16.0-slim AS deps
>>>>>>> c7b745c7b9e20144ccbeace2cfa644679b0d8ebc
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
<<<<<<< HEAD
CMD ["npm", "start"]
=======
CMD ["npm", "run", "start"]
>>>>>>> c7b745c7b9e20144ccbeace2cfa644679b0d8ebc
