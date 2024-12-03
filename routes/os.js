var express = require('express');
var os = require('os'); 
var router = express.Router();

router.get('/', function(req, res, next) {
    res.json ({
        hostname : os.hostname(),
        type : os.type(),
        platform : os.platform(),
    })
  });

  router.get('/cpus', (req, res, next) => {
    res.json({
        cpus: os.cpus(),
    });
});

router.get('/cpus/:id', (req, res, next) => {
    const id = req.params.id;
    const cpus = os.cpus();

    if (id >= 0 && id < cpus.length) {
        const cpu = cpus[id];
        res.json({
            model: cpu.model,
            speed: cpu.speed + ' MHz',
            cores: cpu.cores,
        });
    } else {
        res.status(404).json({
            error: 'Processor not found'
        });
    }
});
  module.exports = router;

