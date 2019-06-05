const newsTyp = require('./newsList');

module.exports.newsType = function(){
    list = []
    for (let key in newsTyp.newsList){
        list.push(key);
    }
    return {data:list}
}
