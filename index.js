
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()


const configuration = new Configuration({
    organization: "org-IP3m9JyTp0DQkDSpaacOwLkX",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/*


console.log(process.env.OPENAI_API_KEY)*/

async function callApi(){
    

}


callApi()


//for portfolio use react fetch and deploy as front end only

//create a simple express apu that calls the function above



const app = express()
//app.use(express.json())
//app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors({
    origin : "*", // (Whatever your frontend url is) 
    credentials: true, // <= Accept credentials (cookies) sent by the client
  }))


  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  }); //is this the answer?
const port = process.env.PORT || 8080

/*
to attach front end
app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});*/

app.post('/', async (req, res)=> {
    
    const {message} = req.body;
    console.log(message)
    
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });

    //console.log(response.data.choices[0].text);
    res.json({
        message: response.data.choices[0].text
    })

    
})

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`)
    
})