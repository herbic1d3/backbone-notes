'use strict';

var express = require('express');
var router = express.Router();

var Note = require("../models/note");

router.get('/api/list', (req, res) => {
    var query = {};
    if (req.query.query) {
        query = {'title': new RegExp(req.query.query, 'i')};
    };

    Note.find(query)
        .exec()
        .then(list =>  {
            res.json(list);
        });
});

module.exports = router;
