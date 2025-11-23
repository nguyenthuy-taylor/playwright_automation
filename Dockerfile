# Dockerfile
FROM mcr.microsoft.com/playwright:v1.56.1-noble

# Set UTF-8 locale và cài font
USER root
RUN apt-get update && apt-get install -y \
    locales \
    fonts-dejavu-core \
    fonts-dejavu-extra \
    fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

# Enable UTF-8
RUN sed -i 's/# en_US.UTF-8/en_US.UTF-8/' /etc/locale.gen \
    && locale-gen en_US.UTF-8

ENV LANG="en_US.UTF-8"
ENV LANGUAGE="en_US:en"
ENV LC_ALL="en_US.UTF-8"

# Tạo folder app và set working directory
WORKDIR /app

# Copy package.json + package-lock.json để tận dụng cache Docker layer
COPY package*.json ./

# Cài dependencies và Playwright browsers
RUN npm install --force && npx playwright install

# Copy toàn bộ source code
COPY . .

# Set quyền nếu cần
RUN chown -R pwuser:pwuser /app

# Chạy container dưới user pwuser
USER pwuser

# Default command khi chạy container
CMD ["npx", "playwright", "test", "--headless"]
