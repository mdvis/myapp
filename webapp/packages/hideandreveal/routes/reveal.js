var express = require('express');
var router = express.Router();
var para = require('../middleware/para');

router.get('/', function(req, res) {
    res.render('reveal',{list:[]} );
});
router.post('/',function(req,res,next){
    var body=req.body;
    global.msgCache= body.ctx;
    global.passCache = body.pass;
    next();
},para.from, function(req, res) {
    var tmp = {};
    global.result.forEach(cur=>{
        if(cur){
            tmp[cur]=JSON.parse(cur);
        }
    });
    res.render('reveal',{list:Object.values(tmp)} );
});

module.exports = router;
