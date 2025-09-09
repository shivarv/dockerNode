# ------------------------
# 1. Build frontend
# ------------------------
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# ------------------------
# 2. Build backend
# ------------------------
FROM node:18 AS backend
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend/ .

# Copy frontend build into backend
COPY --from=frontend-build /app/frontend/build ./frontend/build

# ------------------------
# 3. Run the app
# ------------------------
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "server.js"]