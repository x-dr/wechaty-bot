import Express from 'express';
import sendmsg from '../utils/sendmsg.js'
/**
 * @description 您的机器人上线啦
 * @param {} user
 */
async function onLogin(user, bot) {
  // console.log('bot');
  
  console.log(`Bot${user}已登录了`);

  const app = Express()

  app.set('x-powered-by', false)
  app.use(Express.json())
  // 配置中间件
  app.use(Express.urlencoded({ extended: false }))



  app.post('/send', async (req, res) => {
    const {group, user, msg } = req.body
    // console.log(req.body);
    console.log(group,user, msg);
    await sendmsg(bot,group, user, msg)
    res.send('ok')
  })



  app.all('/', async (req, res) => {
    res.send('ok')
  }
  )


  app.listen(3035, () => {
    console.log('Start service success! listening port: http://127.0.0.1:' + 3035);
  })

  
}


export default onLogin
