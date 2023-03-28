const express = require("express");
const mysql = require('mysql2');

const router = express.Router();

const dbConf = {
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'nuvertos'
  }

function connect() {
    let connection = mysql.createConnection(dbConf);
    connection.connect();
    return connection;
}

function disconnect(connection) {
    connection.end();
}

router.get('/compounds', (req, res) => {
    let limit = req.query.limit || 0;
    let offset = req.query.offset || 0;
    let connection = connect();
    connection.query('SELECT COUNT(*) AS COUNT FROM compounds;', function (error, count, fields) {
        if (error) throw error;
        connection.query(`SELECT * FROM COMPOUNDS LIMIT ${offset}, ${limit};`,function(error, results) {
          if (error) throw error;
          res.json({count: count, data: results})  
          disconnect(connection);
        } )
    }
    );
})

router.get('/details/:id', (req, res) => {
    let id = req.params.id;
    let connection = connect();
    connection.query(`SELECT * FROM compounds WHERE id = ${id};`, function (error, results, fields) {
        if (error) throw error;
        res.json(results)
        disconnect(connection);
    });
})

router.put('/description/:id', (req, res) => {
    let id = req.params.id;
    
    let connection = connect();
    connection.query(`UPDATE compounds SET CompounrDescription = ?, dateModified =CURRENT_TIMESTAMP WHERE id = ${id}`,[req.body.CompounrDescription], function(e, r) {
        if (e) throw e;
        res.json(r)
        disconnect(connection);
    })
})

router.post('/compounds', (req, res) => {
    let connection = connect();
    connection.query(`INSERT INTO compounds (CompoundName, CompounrDescription, strImageSource, strImageAttribution,dateModified) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP);`,
    [req.body.name, req.body.desc, req.body.img, req.body.attr],
    function(e, r) {
        if (e) throw e;
        res.json(r)
        disconnect(connection);
    })
})

router.delete('/compound/:id', (req, res) => {
    let id = req.params.id;
    let connection = connect();
    connection.query(`DELETE FROM compounds WHERE id = ${id}`,
    function(e, r) {
        if (e) throw e;
        res.json(r)
        disconnect(connection);
    })
})


module.exports = router;