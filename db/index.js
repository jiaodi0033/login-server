
const mysql = require('mysql');
const db=mysql.createPool(
    {
        host:'localhost',
        user:'root',
        password:'123456',
        database:'login'
    }
);

module.exports = ( sql,arr,callback) => {
    db.query(sql,arr,function (error,result) {
        if (error) {
            console.log(error)
        }
        callback(result);
    });
};


