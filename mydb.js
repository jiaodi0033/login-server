
async function dataOperate(data) {
    const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb://localhost/";
    var conn = null;
    try {
        conn = await MongoClient.connect(url);
        console.log("数据库已连接");
        const login_db = conn.db("login").collection("users");

        // 查询数据库中是否有该用户
        var arr = await login_db.find({'username':data.username}).toArray();
        if ( arr.length>0 ) return console.log('该用户已存在')

        //不存在则增加
        await login_db.insertOne(data);
        console.log('添加成功')
        console.log(await login_db.find().toArray())

        // 更改
        // await login_db.updateMany({ "site": "runoob.com" },
        //     { $set: { "site": "example.com" } });
        // 查询
        // arr = await test.find().toArray();
        // console.log(arr);
        // 删除
        // await login_db.deleteMany({ "site": "example.com" });
        // 查询
        // arr = await test.find().toArray();
        // console.log(arr);
    } catch (err) {
        console.log("错误：" + err.message);
    } finally {
        if (conn != null) conn.close();
    }
}
