const  mysql=require('mysql2');

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'datademo',
    charset:'utf8_general_ci'
});

connection.connect((err)=>{
    if(err)throw err.stack;
    else {
        console.log('connect success!');
        const sql='create table Customers(id int primary key auto_increment,name varchar(30) not null,address varchar(30))';
        connection.query(sql,(err)=>{
            if(err) console.log(err);
            else {
                console.log('create table success');
                connection.end();
            }
        });
        return;
    }
});