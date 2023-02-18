import { ChatGPTAPI } from 'chatgpt';
let apiKey = '';
const api = new ChatGPTAPI({ apiKey: apiKey || process.env.OPENAI_API_KEY });

const conversationPool = new Map();
async function chatgptReply(room, contact, request) {
    console.log(`contact: ${contact} request: ${request}`);
    let response = '🤒🤒🤒出了一点小问题，请稍后重试下...';
    if(request==="结束对话") {
      conversationPool.delete(contact.id);
      const target = room || contact;
      await send(target, `${contact.name()}的已结束对话`);
      return;
    }else{
      try {
        let opts = {};
        // conversation
        let conversation = conversationPool.get(contact.id);
        if (conversation) {
          opts = conversation;
        }
        opts.timeoutMs = 2 * 60 * 1000;
        let res = await api.sendMessage(request, opts);
        response = res.text;
        console.log(`contact: ${contact} response: ${response}`);
        conversation = {
          conversationId: res.conversationId,
          parentMessageId: res.id,
        };
        conversationPool.set(contact.id, conversation);
      } catch (e) {
        if (e.message === 'ChatGPTAPI error 429') {
          response = '🤯🤯🤯请稍等一下哦，我还在思考你的上一个问题';
        }
        console.error(e);
      }
      response = `${request} \n ------------------------ \n` + response;
      const target = room || contact;
      await send(target, response);
    }


  }
  


  async function send(contact, message) {
    try {
      await contact.say(message);
    } catch (e) {
      console.error(e);
    }
  }


  export default chatgptReply