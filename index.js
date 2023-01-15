const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
const app = express()
app.use(cors())
//OpenAI 
const OpenAI = require('openai');
const { Configuration, OpenAIApi} = OpenAI;

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  const openai = new OpenAIApi(configuration);
// Open AI COnfigaration

app.get('/', (req,res) => {
    res.json('hi')
})

app.get('/respond', async (req,res) => {
    console.log(req.query.product)
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Write a Tagline for a ${req.query.product}`,
        max_tokens: 20,
        temperature: 0,
      });
      res.json(response.data.choices[0].text)
})

app.listen(8000, () => console.log('Server is running on ${PORT}'))