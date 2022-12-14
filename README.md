# ChatGPT Bot

一个 基于 `ChatGPT` + `Wechaty` 的微信机器人

可以用来帮助你自动回复微信消息。

### 准备

+ 1、先获取自己的 api key，地址 ：[创建你的 api key](https://beta.openai.com/account/api-keys) 
> API Key 创建成功。复制好这个Key接下来会用到。点击OK后，Key不会再完整显示。只能删了重新生成Key！
> 如果没账号，可以参考V2EX上这个帖子注册 地址[https://www.v2ex.com/t/900126](https://www.v2ex.com/t/900126)

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-128f461c-6ea9-4838-95b2-1432c033d8e6/fe6b3e02-75a9-4b1e-9c5f-ed5f99922343.png" alt="Create_openai_key.png" title="Create_openai_key.png" height="50%" width="50%" />

~~+ 1、先获取自己的 `chatgpt` token，地址 ：[https://chat.openai.com/chat](https://chat.openai.com/chat)~~

~~+ 2、登录完了，在控制台把 `token` 复制下来，然后在项目根目录下创建一个 `.env` 文件，内容如下：~~

```bash
# $wechaty-bot
# 执行下面命令，拷贝一份 .env.example 文件
cp .env.example .env
```

```bash
#群聊chatgpt自动回复 0为关闭 1为开启
AutoReplyGroup = 1
#好友chatgpt自动回复 0为关闭 1为开启 
AutoReplyFriend = 0
# openai的key，需要自己去获取 ，地址：https://beta.openai.com/account/api-keys
OPENAI_API_KEY ='sk-xxxxxxxxxxxxxxxxx'

```

~~token 在这里拿到：~~

<!-- ~~<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-128f461c-6ea9-4838-95b2-1432c033d8e6/3b58d6e3-8abc-4ab8-916e-511c0b2bdf42.png"  height="330" width="495">~~ -->

~~> 参考这篇文章：[https://github.com/transitive-bullshit/chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api)~~


### 启动服务

#### 1、使用Docker

下载并编辑`.env`配置文件
```bash
mkdir my-wechaty-bot && cd my-wechaty-bot
wget -O .env  https://raw.githubusercontent.com/x-dr/wechaty-bot/main/.env.example 
vim .env

```

> 运行
```bash
docker run -itd --name my-wechaty-bot \
            --restart=always \
           -v $PWD/.env:/app/.env  \
           gindex/wechaty-bot:latest
                    
```
> 查看日志扫码登录
```bash
docker logs my-wechaty-bot -f
```

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-128f461c-6ea9-4838-95b2-1432c033d8e6/67b1a5be-67f2-4d3a-8c01-3ba2a5bb653e.png"  height="330" width="495">


> 自行打包docker镜像
```bash
docker build -t wechaty-bot .
docker run -it --rm --name wechaty-bot wechaty-bot
```


#### 2、本地启动
```bash
git clone https://github.com/x-dr/wechaty-bot.git
npm i
node app.js
```
> 就可以扫码登录了。

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-128f461c-6ea9-4838-95b2-1432c033d8e6/d4ab1dfd-e667-4826-a7b2-b9171fde7f43.png"  height="200" width="495">


用pm2启动后台运行
```
npm install pm2 -g

pm2 start app.js
```
<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-128f461c-6ea9-4838-95b2-1432c033d8e6/511d26f4-4dd5-427c-b19e-fabdddb47207.png"  height="50" width="495">

### 使用
+ 智能回复
```
/c xxxx
```
+ AI绘画
```
/img xxx
```
<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-128f461c-6ea9-4838-95b2-1432c033d8e6/a17c1896-d3db-4ab0-a3ad-ba865adcc26d.png" alt="openai.png" title="openai.png"  height="50%" width="50%" />

### 费用情况

openai是要付费的，价格的计算方式不是简单的按照请求次数计算，包括相应内容的文字的多少。新账号有18美元免费额度。


> 官方价格：https://openai.com/api/pricing

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-128f461c-6ea9-4838-95b2-1432c033d8e6/f87618ba-ac6b-462c-ad4e-78afec07ecdc.png" alt="pay.png" title="pay.png" height="50%" width="50%" />

### 故障排除
+ [Chrome 依赖](./docs/puppeteer-error.md)





### 感谢

[@wechaty](https://github.com/wechaty/wechaty)

[@transitive-bullshit](https://github.com/transitive-bullshit/chatgpt-api)