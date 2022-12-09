FROM node:18.12.1-alpine


# Installs latest Chromium (100) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont  \
      && rm -rf /var/cache/apk/* \
      && rm -rf /tmp/* \
      && rm -rf /var/tmp/* \
      && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
      && echo "Asia/Shanghai" > /etc/timezone

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser


# Create app directory
ADD . /app/
WORKDIR /app

# Install app dependencies
RUN npm install


EXPOSE 8080

CMD [ "npm", "start" ]

