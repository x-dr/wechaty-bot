import { Configuration, OpenAIApi } from 'openai'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)



const getOpenAiReply = async (prompt) => {
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
            temperature: 0.9,
            max_tokens: 4000,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
            stop: [' Human:', ' AI:'],
        })
        // console.log(response.data);
        const reply = response.data.choices[0].text
        return reply
    } catch (e) {
        console.error(e);
        // return e
    }
}
const replyMessage = async (mgsfrom, contact, content) => {
    const reply = await getOpenAiReply(content);
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