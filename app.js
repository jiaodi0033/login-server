const express = require('express');
const app = express();
const Joi = require('@hapi/joi');

//application/x-www-form-urlencoded
app.use(express.urlencoded({extended:false}));

app.use(express.json());//application/json


app.use('/api/register',require('./routers/register'));
app.use('/api/login',require('./routers/login'));

app.use((error,req,res,next) => {
    if ( error instanceof Joi.ValidationError ){
         return res.send({
            status:1,
            msg:[error.details[0].context.label,error.details[0].message]
        })
    }
    res.send({
        status:1,
        msg:error.message || error
    });
})

app.listen(8888,() =>console.log("Sever running on http://localhost:8888"));

module.exports = app;