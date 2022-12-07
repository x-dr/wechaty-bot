import { WechatyBuilder } from 'wechaty'
import onScan from './listeners/on-scan.js'
import onMessage from './listeners/on-message.js'
import onLogin from './listeners/on-login.js'


const bot = WechatyBuilder.build({
    name: "wechat-bot",
    puppet: 'wechaty-puppet-wechat',
    puppetOptions: {
        uos: true,
    },
})

bot.on("login", async user => {
    onLogin(user, bot);
})
bot.on('message', async msg => {
    onMessage(msg, bot);
});
bot.on("scan", async (qrcode, status) => {
    onScan(qrcode, status);
});

bot
    .start()
    .then(() => console.log("开始登陆微信"))
    .catch(e => console.error(e));


