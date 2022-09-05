const express = require('express');
const router = express.Router()

router.post('/register', function (req, res) {
    const email = req.body.email;

    res.send(email);
    // res.send("paokue test")
})

module.exports = router;