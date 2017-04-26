var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://@localhost/tcc-iot-rest', ['devices', 'attributes']);
//var db = mongojs('mongodb://marrom:marrom@ds153729.mlab.com:53729/tcc-iot-rest', ['devices']);

var attribute = {
    "name": "",
    "deviceId": "",
    "path": "",
    "creation": ""
};

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
    if(!device.ip) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.devices.save(device, function(err, result) {
            if(err) {
                res.send(err);
            } else {
                if(device.attributes.temperature) {                    
                    db.attributes.insert(createAttribute("Temperatura", result));
                }
                if(device.attributes.pressure) {                    
                    db.attributes.insert(createAttribute("Pressão", result));
                }
                if(device.attributes.luminosity) {                    
                    db.attributes.insert(createAttribute("Luminosidade", result));
                }
                if(device.attributes.switch) {                    
                    db.attributes.insert(createAttribute("Switch", result));
                }                
                res.json(result);
            }
        });
    }
});

//Update device
router.put('/device/:id', function(req, res, next) {
    var device = req.body;    
    var updObj = { 
        ip: device.ip,
        name: device.name,
        interval: device.interval,
        creation: device.creation,
        modification: device.modification
    };

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

//Get attributes by deviceID
router.get('/device/attribute/:id', function(req, res, next) {
    db.attributes.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, device) {
        if(err) {
            res.send(err);
        } else {
            res.json(device);
        }
    });
});

createAttribute = function(attributeType, newDevice) {
    var dateNow = Date.now();
    attribute = {
        "name": attributeType,
        "deviceId": mongojs.ObjectId(newDevice._id),
        "path": "coap://"+newDevice.ip+"/"+newDevice._id+"/"+attributeType,
        "creation": dateNow
    };

    return attribute;
}

module.exports = router;