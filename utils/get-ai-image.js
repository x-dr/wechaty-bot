import { Configuration, OpenAIApi } from 'openai'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import { FileBox } from 'file-box'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const createAiImage = async (prompt) => {
    try {
        const openai = new OpenAIApi(configuration);
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });
        console.log(response.data.data);
        return response.data.data[0].url
    }
    catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            return error.response.data.error.message
        } else {
            console.log(error.message);
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