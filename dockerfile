# 使用官方 Node.js LTS 作為基礎映像
FROM node:18-alpine AS base

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 yarn.lock 文件
COPY package.json yarn.lock ./

# 安裝依賴
RUN yarn install --frozen-lockfile

# 複製剩餘的專案文件
COPY . .

# 構建 Next.js 應用
RUN yarn build

# 使用輕量級 Node.js 映像作為最終運行階段
FROM node:18-alpine AS runner

# 設定工作目錄
WORKDIR /app

# 複製構建輸出的文件和依賴
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./package.json

# 設定默認環境變量
ENV NODE_ENV=production
ENV PORT=3000

# 暴露應用的默認端口
EXPOSE 3000

# 啟動應用
CMD ["yarn", "start"]
