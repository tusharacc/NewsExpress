const request = require('request');
const parseString = require('xml2js').parseString;
const parse = require('date-fns/parse');
const format = require('date-fns/format');
const isYesterday = require('date-fns/is_yesterday')
const isToday = require('date-fns/is_today');
const allNews = require('./newsList');

urlList = {
    'politics':['https://indianexpress.com/print/front-page/feed/'],
    'world':['https://indianexpress.com/section/world/feed/'],
    'editorial':['https://indianexpress.com/section/opinion/editorials/feed/']

}

module.exports.request = function(type){
    //links = urlList[type];
    links = allNews.newsList[type];
    collectedNews = [];

    return new Promise((resolve,reject) => {
        for (let i = 0; i < links.length; i++){
            request(links[i]['url'],(err, res, body) => {
                if (err) { reject({data: null,status: err}); }
                parseString(body, function (err, result) {
                    let temp = result['rss']['channel'][0];
                    console.log(`The length of arr is ${temp['item'].length}`);
                    for (let j = 0; j < temp['item'].length; j++){
                        console.log(`The title is ${temp['item'][j]['title'][0]}`);
                        title = temp['item'][j]['title'][0];
                        link = encodeURIComponent(temp['item'][j]['link'][0]);
                        pubDate = format(parse(temp['item'][j]['pubDate'][0]),'YYYY-MM-DD');
                        if (isToday(pubDate) || isYesterday(pubDate)){
                            collectedNews.push({title: title,link: link, pubDate: pubDate, news: links[i]['news']})
                        }
                    }
                    console.log(`value of ${i} and ${links.length - 1}`)
                    if (i == links.length - 1){
                        resolve({data:collectedNews, status:'Ok'});
                    }
                });
            });
        }
    })   
}