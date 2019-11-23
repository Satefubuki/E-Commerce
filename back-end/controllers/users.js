const express = require('express');
const jwt = require('jsonwebtoken');
const helper = require('../utils/helper');
const { User } = require('../models/db');
const { ErrorResult, Result } = require('../utils/base_response');
const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    User.findAll().then(users => {
        res.send(Result(users));
    })
});

router.get('/:id(\\d+)', (req, res) => {
    User.findByPk(req.params.id).then(type => {
        if (type != null) {
            res.json(Result(type));
        } else {
            res.status(404).json(ErrorResult(404, 'Not Found'));
        }
    });
});

router.post('/', (req, res) => {
    console.log('da vao');

    req.body.password = helper.hash(req.body.password);
    User.create(req.body).then(type => {
        res.json(Result(type));
    }).catch(err => {
        return res.status(400).json(ErrorResult(404, err.errors));
    });
})

router.post('/login', (req, res) => {
    console.log('req.body: ' + req.body.username);

    User.findAll({
        where: {
            username: req.body.username,
            password: helper.hash(req.body.password)
        }
    }).then(users => {
        if (users[0] != null) {
            const token = jwt.sign({ userid: users[0].userid, username: users[0].username }, helper.appKey, { expiresIn: '1h' });
            res.json(Result({
                id: users[0].id,
                username: users[0].username,
                fullname: users[0].fullname,
                coin: users[0].coin,
                token: token,
            }));
        } else {
            res.status(401).json(ErrorResult(401, 'Invalid username or password'));
        }
    });
});

module.exports = router;