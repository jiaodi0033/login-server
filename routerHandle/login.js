const db = require('../db');
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');

const config = require('../config/index');


module.exports = (req,res) => {
    //查询用户是否存在
    const sql = 'SELECT * FROM users WHERE username=?';
    db(sql,req.body.username,result => {
        if ( result.length !==1){
            return res.send({
                status:1,
                msg:'此用户不存在'
            });
        };
        //如果存在就进行密码比较
        const comRes=bcrypt.compareSync(req.body.password,result[0].password);
        if (!comRes ){
            return res.send({
                status:1,
                msg:"密码错误"
            })
        };
        // 根据用户信息生成Token
        const token = jsonWebToken.sign({username:req.body.username},config.jwtKey,{
            expiresIn:'1h'
        });
        res.send({
            status:0,
            msg:'登录成功',
            token:token
        })
    })

};