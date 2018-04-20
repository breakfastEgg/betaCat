import mysql from 'mysql';

const pool = mysql.createPool({
    host     :  '127.0.0.1',
    user     :  'root',
    password :  '',
    database :  'go'
})

const getConnection = function(){
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if (err){
                reject(err);
            }else{
                resolve(connection);
            }
        })
    });
}

const query = async function(){
    let connection = await getConnection();
    return new Promise((resolve,reject) => {
        connection.query(sql,values,(err,rows) => {
            if(err){
                reject(err);
            }else{
                resolve(rows);
            }
        });
    });
}