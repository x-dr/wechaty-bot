import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import replyMessage from '../utils/get-openai.js'
import replyAiImage from '../utils/get-ai-image.js'

//  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const AutoReplyFriend = parseInt(process.env.AutoReplyFriend)
const AutoReplyGroup = parseInt(process.env.AutoReplyGroup)
const RoomList = JSON.parse(process.env.RoomList); // in your app file
const FriendList = JSON.parse(process.env.FriendList); // in your app file


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
    if (AutoReplyGroup) {
      if (RoomList.length === 0 || RoomList.includes(topic)) {
        if (content.startsWith('/c ')) {
          replyMessage(mgsfrom, room, content.replace('/c ', ''))
        } else if (content.startsWith('/img ')) {
          replyAiImage(mgsfrom, room, content.replace('/img ', ''))
        }
      } else {
        console.log(`群名: ${topic} 不在群列表中`);
        return
      }
    } else {
      console.log("群消息自动回复已关闭");
    }

  } else if (isText) {
    // 如果是好友消息 目前只处理文字消息
    if (AutoReplyFriend) {
      if (FriendList.length === 0 || FriendList.includes(contact.name())) {
        const mgsfrom = false
        if (content.startsWith('/c ')) {
          replyMessage(mgsfrom, contact, content.replace('/c ', ''))
        } else if (content.startsWith('/img ')) {
          replyAiImage(mgsfrom, contact, content.replace('/img ', ''))
        }
      } else {
        console.log(`好友名: ${contact.name()} 不在好友列表中`);
        return
      }
    } else {
      console.log("好友消息自动回复已关闭");
    }
  }

}

export default onMessage