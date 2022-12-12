import { Configuration, OpenAIApi } from 'openai'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)



const getOpenAiReply = async (prompt) => {
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: [' Human:', ' AI:'],
    })
    // console.log(response.data);
    const reply = response.data.choices[0].text
    return reply
}

// getOpenAiReply('删除github上的一次提交')
const replyMessage = async (mgsfrom,contact, content) => {
    //   async function replyMessage(contact, content) {
        const reply = await getOpenAiReply(content);
        try {
          await contact.say(`@${mgsfrom} ${reply}`);
        } catch (e) {
          console.error(e);
        }
      }

export default replyMessage