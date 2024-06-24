const express = require('express');
const router = express.Router();
const addToCSV = require('../utils/csv.util');

router.post('/', function(req, res, next) {
    const { firstName, lastName, email, isPresent, foodRestrictions, answers } = req.body;

    const formData = {
        'prénom': firstName,
        'nom': lastName,
        'email': email,
        'présence': isPresent,
        'restriction alimentaires': foodRestrictions,
        'questions': answers
    };

    addToCSV(formData);

    res.redirect('/');
});

module.exports = router;
