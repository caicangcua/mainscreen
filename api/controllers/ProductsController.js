'use strict'

const util = require('util')
//const mysql = require('mysql')
//const db = require('./../db')

//const table = 'products'
const request = require('request');

module.exports = {
    get: (req, res) => {
        request({
            method: 'PUT',
            uri: "https://api.github.com/repos/caicangcua/pk8/contents/f1/f2/file.txt",
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36',
                "Content-Type" : "application/vnd.github.v3+json",
                "Authorization": "Token 39f250d422b1582fa2f9a6125f70a71226fa6377"
            },
            body:JSON.stringify( {
                "message": "my commit message",
                "committer": {
                    "name": "My name",
                    "email": "my email"
                },
                "content": "bXkgdXBkYXRlZCBmaWxlIGNvbnRlbnRz"
            })
        }, function (error, request, body) {
            console.log(body);
        });

        res.json({ 'fuck': 'fucking' });
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM products WHERE id = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let productId = req.params.productId;
        let sql = 'UPDATE products SET ? WHERE id = ?'
        db.query(sql, [data, productId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Update success!'})
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO products SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({ message: 'Insert success!'})
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM products WHERE id = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Delete success!'})
        })
    }
}