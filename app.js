const express = require("express");
const hbs = require("hbs");
const getTime = require("./helpers/getTime");
const getWord = require("./helpers/getWord");
const fetch = require('node-fetch');
const fs = require('fs');

let newsServerURL = "http://slowpoke.desigens.com/json/1/7000"
let phrasesServerURL = "http://slowpoke.desigens.com/json/2/3000";

function logTime() {
    return new Date().format("Y-MM-dd HH:mm:SS") + " ";
}

function myLog(message) {
    fs.appendFile('readme.log', logTime() + message + '\n', (err) => {
        if (err) throw err
    });
}

let news;
async function getNews() {
    let response = await fetch(newsServerURL)
        .then(response => (news = response.json()))
        .catch(err => myLog(err));
    return news;
}

let phrases;
async function getPhrases() {
    let response = await fetch(phrasesServerURL)
        .then(response => phrases = response.json())
        .catch(err => myLog(err));
    return phrases;
}


const app = express();
hbs.registerHelper("getTime", getTime);
hbs.registerHelper("getWord", getWord);
hbs.registerPartials(__dirname + "/views/partials");
app.use('/css',express.static(__dirname +'/css'));
app.set("view engine", "hbs");

app.get("/", async (req, res, next) => {
    try {
        news = await getNews()
        phrases = await getPhrases();

        setTimeout(() => {
            try { if (!news){
                res.render("noNews.hbs"), 6000, null;
                throw new Error(`Servers ${newsServerURL} & ${phrasesServerURL}  not responding during 6 sec`);
            }
            } catch (err) { myLog(err) };
        })

        res.render("index.hbs",
            {
                articles: news,
                phrases: phrases
            }
        );
    } catch (err) {
        myLog(err)
    }

})
app.listen(3000);