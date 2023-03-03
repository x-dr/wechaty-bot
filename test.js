import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

let apiKey = '';
// const api = new ChatGPTAPI({ 
//   apiKey: apiKey || process.env.OPENAI_API_KEY,
//   apiBaseUrl:'https://api.openai.com' || process.env.OPENAI_API_KEY
// });

console.log(apiKey || process.env.OPENAI_API_KEY);
console.log(process.env.PROXY_API || 'https://api.openai.com');