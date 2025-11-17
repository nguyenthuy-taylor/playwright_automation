# Dockerfile
FROM mcr.microsoft.com/playwright:v1.56.1-noble

# Tạo folder app và set working directory
WORKDIR /app

# Chỉ copy package.json + package-lock.json trước để tận dụng cache Docker layer
COPY package*.json ./

# Cài dependencies và Playwright browsers
RUN npm install --force && npx playwright install

# Copy toàn bộ source code
COPY . .

# Set quyền nếu cần
RUN chown -R pwuser:pwuser /app

# Default command khi chạy container
CMD ["npx", "playwright", "test", "--headless"]
