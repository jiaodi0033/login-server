const express = require('express');
const app = express();
const Joi = require('@hapi/joi');
const expJWT = require('express-jwt');
const  config = require('./config');

//application/x-www-form-urlencoded
app.use(express.urlencoded({extended:false}));

app.use(express.json());//application/json

app.use(expJWT({ secret: config.jwtKey,algorithms:['HS256']}).unless({path: ['/api/login','/api/register']}));

app.use('/api/register',require('./routers/register'));
app.use('/api/login',require('./routers/login'));
app.use('/api/personal',require('./routers/personal'))


app.use((error,req,res,next) => {
    if ( error instanceof Joi.ValidationError ){
         return res.send({
            status:1,
            msg:[error.details[0].context.label,error.details[0].message]
        })
    }
    if ( error.name === 'UnauthorizedError'){
        return res.send({
            status:1,
            msg:'Token Error'
        })
    }
    res.send({
        status:1,
        msg:error.message || error
    });
})

app.listen(8888,() =>console.log("Sever running on http://localhost:8888"));

module.exports = app;