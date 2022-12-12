import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import replyMessage from '../utils/get-openai.js'

//  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const AutoReplyFriend = parseInt(process.env.AutoReplyFriend)
const AutoReplyGroup = parseInt(process.env.AutoReplyGroup)


 const onMessage = async (msg, bot) => {
   const contact = msg.talker(); // 发消息人
   const UrlLink = bot.UrlLink; 
   const content = msg.text().trim(); // 消息内容
   const room = msg.room(); // 是否是群消息
   const alias = await contact.alias(); // 发消息人备注
   const isText = msg.type() === bot.Message.Type.Text; // 是否是文字消息
   const receiver = msg.to();  // 消息接收者

  //防止自己和自己对话
   if (msg.self()) {
     return;
   }

   if (room && isText) {
     // 如果是群消息 目前只处理文字消息
     const topic = await room.topic();
     const mgsfrom = contact.name()
     console.log(`群名: ${topic} 发消息人: ${mgsfrom} 内容: ${content}`);
    //  获取机器人是否在群里被@ 了
     if (await msg.mentionSelf()) {
       const [groupContent] = content.split(`@${receiver.name()}`).filter(item => item.trim())
       // console.log('this message were mentioned me! [You were mentioned] tip ([有人@我]的提示)');
       if (AutoReplyGroup) {
         replyMessage(mgsfrom, room, groupContent)
       }
     }
 
   } else if (isText) {

    if (content && AutoReplyFriend) {
        const mgsfrom=false
        replyMessage(mgsfrom,contact, content)
      }
     // 如果非群消息 目前只处理文字消息
    //  if (!alias) {
    //    console.log(`发消息人: ${contact.name()} 内容: ${content}`);
    //  } else {
    //    console.log(`发消息人: ${alias} 消息内容: ${content}`);
    //  }
   }
 }
 
 export default onMessage