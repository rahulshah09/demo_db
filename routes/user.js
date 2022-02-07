const express = require('express');
const { createPoolCluster } = require('mariadb');
const router = express.Router();
const pool = require('../helpers/database');


// Get data from table
router.get('/:id', async function(req,res){
    try{
        debugger;
        const sqlQuery = 'SELECT id, email, password, created_at FROM user WHERE id=?';
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    } catch(error) {
        res.status(400).send(error.message)
    }


  // res.status(200).json({id:req.params.id})   
})

// insert data in table
router.post('/register', async function(req,res) {
    try {
        const {email, password} = req.body;

        const sqlQuery = 'INSERT INTO user (email, password) VALUES (?,?)';
        const result =await pool.query(sqlQuery, [email, password]);

        res.status(200).json({userId: result.insertId});
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// Delete data from table
router.delete('/:id', async function(req,res) {
    try {
        const sqlQuery = 'DELETE FROM user WHERE id=?';
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// Update data in table
router.put('/:id', async function(req,res) {
    try {
        const {email} = req.body;

        const sqlQuery = 'UPDATE user SET email =? WHERE id =?';
        const rows = await pool.query(sqlQuery, [email, req.params.id]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;