const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req,res) => {

    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({error: 'Could not retrieve accounts'})
        })
})

server.post('/', (req,res) => {
    const acc = req.body;

    db('accounts')
        .insert(acc, 'id')
        .then(acc => {
            res.status(201).json(acc);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Could not add an account'})
        })
})

server.get('/:id', (req,res) => {
    const {id} = req.params;
    db('accounts')
        .where({id})
        .first()
        .then(acc => {
            res.status(200).json(acc);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Could not get that specific account'})
        })
})

server.put('/:id', (req,res) => {
    const {id} = req.params;
    const updated = req.body;

    db('accounts')
        .where({id})
        .update(updated)
        .then(count => {
            if(count > 0)
            {
                res.status(204).json(count);
            }else{
                res.status(404).json({error: 'Account not found'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Could not update the account'})
        })
})

server.delete('/:id', (req,res) => {
    const {id} = req.params;

    db('accounts')
        .where({id})
        .del()
        .then(count => {
            if(count > 0)
            {
                res.status(204).json(count);
            }else{
                res.status(404).json({error: 'Account not found'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Could not delete the account'})
        })
})

module.exports = server;