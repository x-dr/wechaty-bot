import { ChatGPTAPI } from 'chatgpt'
import pTimeout from 'p-timeout'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()



const ChatGPTToken = process.env.ChatGPTToken

const getChatGPTReply = async (content) => {
    if (ChatGPTToken) {
        const api = new ChatGPTAPI({ sessionToken: ChatGPTToken })
        await api.ensureAuth()
        console.log('content: ', content);
        // 设置超时时间,防止因超时时因错误而报错拒绝
        const threeMinutesMs = 3 * 60 * 1000
        const response = await pTimeout(
            api.sendMessage(content),
            {
                milliseconds: threeMinutesMs,
                message: '请求超时！'
            }
        )
        console.log('response: ', response);
        return response
    } else {
        return '没有ChatGPT Token'
    }
}

const replyMessage = async (mgsfrom, contact, content) => {
    const reply = await getChatGPTReply(content);
    try {
        if (mgsfrom) {
            await contact.say(`@${mgsfrom} ${reply}`);
        } else {
            await contact.say(reply);
        }
    } catch (e) {
        console.error(e);
    }
}


export default replyMessage