/**
 * name: para.js
 * author: Deve
 * date: 2023-06-14
 */
var stegcloak = require('../stegcloak');
var paraSplit = '\r\n';
var lineSplit = '，';

var proxy = function(req,callback){
    var list = req.body.content.split(paraSplit);
    return list.map(cur=>{
        if(cur.includes(lineSplit)){
            return callback(cur);
        }
        return cur;
    });
};

function to(req,res,next){
    if(req.path === '/3'){
        global.result = proxy(req, function(cur){
            return stegcloak.hide(global.msgCache,global.passCache,cur);
        }).join(paraSplit);
        next();
    }
}

function from(req,res,next){
    global.result = proxy(req, function(cur){
        const tmp = JSON.parse(stegcloak.reveal(cur, global.passCache));
        tmp.cur=(cur.slice(0,20)+'...').replace(/\u200D/g,'').replace(/\u200C/g,'');
        return JSON.stringify(tmp);
    })
        .filter(cur=>cur.includes('pass')&&cur.includes('pass'));
    next();
}

module.exports={ to,from };
