const express = require('express');
const bodyParser = require('body-parser');
const news = require('./news');
const article = require('./article');

const app = express();

app.use(bodyParser.json())

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods',"GET, POST, OPTIONS");
    next()
})

app.get('/api/news/:type',(req,res,next) => {
    console.log('Paramas',req.params['type']);
    news.request(req.params['type'])
    .then(data => {
        console.dir(`News - The data returned is ${data}`);
        res.status(200).json(data);
    })
    .catch(err => {
        console.dir(`News - The data returned is error ${err}`);
        res.status(404).json(err);
    })
    
});

app.get('/api/detail/:url',(req,res,next) => {
    article.details(req.params['url'])
    .then(data => {
        console.dir(`Article - The data returned is ${data}`);
        res.status(200).json(data);
    })
    .catch(err => {
        console.dir(`Article - The data returned is error ${err}`);
        res.status(404).json(err);
    })
});


module.exports = app;