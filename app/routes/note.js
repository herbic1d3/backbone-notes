var express = require('express');
var router = express.Router();
var Note = require("../models/note");

router.get('/api/item/:id', (req, res) => {
    var model = new Note();
    Note.findById(req.params.id)
        .exec()
        .then(result => {
            res.json(result);  
        })
        .catch(err => {
            res.json(err)
        });
});

router.put('/api/item/:id', (req, res) => {
    Note.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true, upsert: true})
        .exec()
        .then(response => {
            res.json({success: true});
        })
        .catch(response => {
            res.json({success: false, response: response});
        })
});

router.post('/api/item', (req, res) => {
    Note.create(req.body)
        .then(response => {
            res.json({success: true});
        })
        .catch(response => {
            res.json({success: false, response: response});
        })
});

router.delete('/api/item/:id', (req, res) => {
    Note.findOneAndRemove({id: req.body.id})
        .exec()
        .then(response => {
            res.json({success: true});
        })
        .catch(response => {
            res.json({success: false, response: response});
        })
});

module.exports = router;