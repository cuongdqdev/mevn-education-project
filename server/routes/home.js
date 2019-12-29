const express                       = require('express');
const router                        = express.Router();
const { USER }                      = require('../models/user')


router.post('/register', async (req, res) => {
    let { username, password } = req.body;
    let infoUser = await USER.register({ username, password });
    return res.json(infoUser);
})

router.post('/login', async (req, res) => {
    let { username, password } = req.body;
    let infoUser = await USER.login({ username, password });
    return res.json(infoUser);
})

exports.USER_ROUTER = router;
