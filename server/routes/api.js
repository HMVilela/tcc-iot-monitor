var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://marrom:marrom@ds153729.mlab.com:53729/tcc-iot-rest', ['devices']);

//Get Devices
router.get('/devices', function(req, res, next) {
    db.devices.find(function(err, devices) {
        if(err) {
            res.send(err);
        } else {
            res.json(devices);
        }
    });
});

//Get single devices
router.get('/device/:id', function(req, res, next) {
    db.devices.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, device) {
        if(err) {
            res.send(err);
        } else {
            res.json(device);
        }
    });
});

//Save device
router.post('/device', function(req, res, next) {
    var device = req.body;
    if(!device.ip || !(device.isCompleted + '')) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.devices.save(device, function(err, result) {
            if(err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

//Update device
router.put('/device/:id', function(req, res, next) {
    var device = req.body;
    var updObj = {};

    if(device.isCompleted ) {
        updObj.isCompleted = device.isCompleted;
    }
    if(device.ip) {
        updObj.ip = device.ip;
    }
    if(!updObj) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.devices.update({
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

//Delete device
router.delete('/device/:id', function(req, res, next) {
    db.devices.remove({
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