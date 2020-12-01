const express = require('express');
const router = express.Router();

router.post('/',(req,res) =>{
    console.log( req.user,'aaaa');
    res.send({
        status:0,
        msg:'请求成功',
        username:req.user.username
    })
})

module.exports = router;