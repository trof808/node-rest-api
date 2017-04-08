const express = require('express')
const router = express.Router();

const User = require('../models/UserModel');

router.get('/', (req, res, next) => {
    let options = {
        title: 'this is main page'
    };
    User.find({}).then((users) => {
        options.users = users;
        res.render('index', {options: options});
    }).catch(next);
});

router.get('/:username', (req, res, next) => {
    let options = {};
    User.findOne({username:req.params.username}).then((user) => {
        options.user = user;
        res.render('user', {options: options});
    }).catch(next);
});

router.post('/', (req, res, next) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then((user) => {
        console.log(user);
        res.status(200);
        res.send(user);
    }).catch(next);
});

router.delete('/:id', (req, res, next) => {
    User.findByIdAndRemove(req.params.id).then((user) => {
        res.send(user);
    }).catch(next);
});

router.put('/:id', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body).then((user) => {
        res.send(user);
    }).catch(next);
});

module.exports = router;
