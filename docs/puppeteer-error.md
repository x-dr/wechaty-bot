
### 缺少Chrome 依赖

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-128f461c-6ea9-4838-95b2-1432c033d8e6/beb1ea21-0e3c-4c47-9fc4-d67ba3752cf3.png"  height="330" width="495">


> 参考 [https://github.com/puppeteer/puppeteer](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md)

> ubuntu,dabian运行以下命令解决

```bash
sudo apt-get update
sudo apt-get install -y libgbm-dev
sudo apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```