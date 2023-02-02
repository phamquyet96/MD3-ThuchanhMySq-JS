const  mysql=require('mysql2');
const http=require('http');
const url=require('url');

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'datademo',
    charset:'utf8_general_ci'
});

connection.connect((err)=> {
    if (err) throw err.stack;
    else {
        console.log('connect success!');
    }
});

const server=http.createServer(async (req, res)=>{
    try{
        if(req.url==='/user' && req.method==='POST'){
            const buffers=[];
            for await (const chunk of req){
                buffers.push(chunk);
            }
            const data=Buffer.concat(buffers).toString();
            const userData=JSON.parse(data);
            console.log(userData)
            const sql=`call addCustomer('${userData.name}','${userData.address}')`;
            connection.query(sql,(err, result, fields)=>{
                if(err)throw err;
                res.end('Success');
            })
        }
    }catch (err){
        return res.end(err.message);
    }
});
server.listen(8080,()=>{
    console.log('Server is running at localhost 8080');
});
