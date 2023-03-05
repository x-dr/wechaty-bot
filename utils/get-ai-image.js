import { requestPromise } from './req.js'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import { FileBox } from 'file-box'


const url = process.env.PROXY_API ? `${process.env.PROXY_API}/v1/images/generations` : "https://api.openai.com/v1/images/generations"

const createAiImage= async (prompt)=>{
    let res = await requestPromise({
      url:url,
      headers:{
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`
      },
      body:{
        "prompt": prompt,
        "n": 1,
        "size": "512x512"
      }
    
      });
      try{
          console.log(res.data.data[0].url);
          return res.data.data[0].url
      }catch(error) {
        if (error.response) {
            // console.log(error.response.status);
            // console.log(error.response.data);
            return error.response.data.error.message
        } else {
            // console.log(error.message);
            return error.message
        }
    }

      
}




const replyAiImage = async (mgsfrom, contact, content) => { 
    try {
        const imgurl = await createAiImage(content);
        const img = FileBox.fromUrl(imgurl,'img.png')
        if (mgsfrom) {
            await contact.say(`@${mgsfrom} 图片生成中...`);
            await contact.say(img)
        } else {
            await contact.say(img);
        }
    } catch (e) {
        console.error(e);
    }
}
export default replyAiImage
