import { requestPromise } from './req.js'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import { FileBox } from 'file-box'


const url = process.env.PROXY_API ? `${process.env.PROXY_API}/v1/images/generations` : "https://api.openai.com/v1/images/generations"

const createAiImage = async (prompt) => {
    let res = await requestPromise({
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: {
            "prompt": prompt,
            "n": 1,
            "size": "1024x1024"
        }

    });
    try {

        if (res.hasOwnProperty('data')) {
            return res.data.data[0].url
        } else if(res.hasOwnProperty("response")) {
            // console.log(res.response);
            return res.response.data.error.message
        }else{
            return "?????????????"
        }

    }catch(e){
        console.log(e)
    }

      
}




const replyAiImage = async (mgsfrom, contact, content) => {
    try {
        const imgurl = await createAiImage(content);
        if(/https:\/\//.test(imgurl)){
            const img = FileBox.fromUrl(imgurl, 'img.png')
            if (mgsfrom) {
                await contact.say(`@${mgsfrom} 图片生成中...`);
                await contact.say(img)
            } else {
                await contact.say(img);
            }
        }else{
            if (mgsfrom) {
                await contact.say(`@${mgsfrom} ${imgurl}`);

            } else {
                await contact.say(imgurl);
            }
        }
    } catch (e) {
        console.error(e);
    }
}
export default replyAiImage
