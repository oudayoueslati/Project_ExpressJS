var express = require('express');
const { route } = require('.');
var router = express.Router();
const paysController = require('../controller/paysController');
const pays = require('../model/pays');

/* GET home page. */
router.get('/pageaccueilpays', function(req, res, next) {
  res.end('bienvenue sur la page pays');
});

// fonction 1 getAll (on va la treter dans le controller)
router.get('/getAll', paysController.showAll);


// fonction 2 getById (on va la treter dans le controller)  
router.get('/getById/:id', paysController.showById);

// fonction 3 Add (on va la treter dans le controller)
router.post('/add', paysController.addPays);




// fonction 4 update 
router.put('/update/:id', async function(req, res) {
    try {
        console.log("avant");
        console.log(req.body);
        console.log("apres");
        await pays.findByIdAndUpdate(req.params.id, req.body,{new: true});
        res.send("modifié avec succès");
    }
    catch (err) {
        console.log(err);
    }
});

// fonction 5 delete
router.delete('/delete/:id',async function(req, res, next) {    
    try {
        await pays.findByIdAndDelete(req.params.id);
        res.send("supprimé avec succès");
    }
    catch (err) {
        console.log(err);
    }
});


module.exports = router;
