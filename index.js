const PORT = 8080

const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()
newsSources = [];
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

app.get('/', (req, res) => { 
    
    axios.get('https://www.autosport.com/f1/').then((response) => {
    const html = response.data;
    //res.json(html);
    const $ = cheerio.load(html);
     
    $('a:contains("Verstappen")', html).each(function() {
        const title = $(this).text();
        const url = $(this).attr('href');
        newsSources.push({
        title,
        url
        })
    })
    res.json(newsSources);
    }).catch((error) => console.log(error));
})