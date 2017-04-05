var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://marrom:marrom@ds153729.mlab.com:53729/tcc-iot-rest', ['data']);

//Get data
router.get('/data', function(req, res, next) {
    db.datas.find(function(err, datas) {
        if(err) {
            res.send(err);
        } else {
            res.json(datas);
        }
    });
});

//Get single data
router.get('/data/:id', function(req, res, next) {
    db.datas.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, data) {
        if(err) {
            res.send(err);
        } else {
            res.json(data);
        }
    });
});

//Save data
router.post('/data', function(req, res, next) {
    var data = req.body;
    if(!data.id) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.datas.save(data, function(err, result) {
            if(err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

//Update data
router.put('/data/:id', function(req, res, next) {
    var data = req.body;
    var updObj = {};

    if(data.isCompleted ) {
        updObj.isCompleted = data.isCompleted;
    }
    if(data.ip) {
        updObj.ip = data.ip;
    }
    if(!updObj) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.datas.update({
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

//Delete data
router.delete('/data/:id', function(req, res, next) {
    db.datas.remove({
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