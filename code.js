const express = require('express');
const axios = require('axios');

const port = 3000;
const app = express();
const server = require('http').createServer(app);


app.get('/', (req, res)=>{
    res.sendFile('D:/3 курс/web/exchange_rates/public/index.html');
})

app.get('/get/:val', (req, res)=>{

    //Обращаемся к бд и проверяме, нет ли уже загруженных курсов
    let options = {
        method: 'get',
        uri: 'https://www.cbr-xml-daily.ru/daily_json.js',
        json: true
    };

    //console.log(req.params.val);

    let val = req.params.val;
    let response = null;
    new Promise(async(resolve, reject)=>{
        try {
            response = await axios('https://www.cbr-xml-daily.ru/daily_json.js');

        } catch (er) {
            response = null;
        //    console.log(er);
        //    reject (er);
        }
        if (response) {
            let json = response.data;
            let value = json['Valute'][val]['Value'];
            console.log(value);
         //   resolve(json);

            res.send({"value":value});
        }
    })
})



server.listen(port, function(){
    console.log(`Listen on port ${port}`);
})

