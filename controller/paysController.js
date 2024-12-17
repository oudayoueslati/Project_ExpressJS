const pays = require('../model/pays');
const express = require('express');

// fonction 1 : showAll
async function showAll(req, res) {
    try {
        const data = await pays.find();
        res.send(data);

    }
    catch (err) {
        console.log(err);
    }
}

//fonction 2 : showById
async function showById(req, res) {
    try {
        const data = await pays.findById(req.params.id);
        res.send(data);
    }
    catch (err) {
        console.log(err);
    }
}

//fonction 3 : addPays
async function addPays(req, res) {
    try {
        const Pays = new pays(req.body);
        await Pays.save();
        res.status(201).send("ajouter avec succès");
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = {
    showAll,
    showById,
    addPays

};
