var express = require('express');
var para = require('../middleware/para');
var router = express.Router();

router.get('/1', function(req, res ) {
    res.render('step1');
});
router.get('/2', function(req, res ) {
    var query = req.query;

    global.msgCache = JSON.stringify(query);
    global.passCache = query.pass;

    res.render('step2');
});
router.post('/3', para.to, function(req, res ) {
    res.render('step3', {hidetext:global.result});
});

module.exports = router;
