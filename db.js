
const mogngoClient=require('mongodb').mongoClient;
const url="mongodb://localhost:27017/test";
mogngoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    console.log("数据库已创建!");
    db.close();
});
console.log(mogngoClient)