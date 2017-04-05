var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://marrom:marrom@ds153729.mlab.com:53729/tcc-iot-rest', ['attributes']);

//Get Attributes
router.get('/attributes', function(req, res, next) {
    db.attributes.find(function(err, attributes) {
        if(err) {
            res.send(err);
        } else {
            res.json(attributes);
        }
    });
});

//Get single attribute
router.get('/attribute/:id', function(req, res, next) {
    db.attributes.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, attribute) {
        if(err) {
            res.send(err);
        } else {
            res.json(attribute);
        }
    });
});

//Save attribute
router.post('/attribute', function(req, res, next) {
    var attribute = req.body;
    if(!attribute.id) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.attributes.save(attribute, function(err, result) {
            if(err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

//Update attribute
router.put('/attribute/:id', function(req, res, next) {
    var attribute = req.body;
    var updObj = {};

    if(attribute.isCompleted ) {
        updObj.isCompleted = attribute.isCompleted;
    }
    if(attribute.ip) {
        updObj.ip = attribute.ip;
    }
    if(!updObj) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.attributes.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updObj, {}, function(err, result) {
            if(err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

//Delete attribute
router.delete('/attribute/:id', function(req, res, next) {
    db.attributes.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result) {
        if(err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });    
});

module.exports = router;