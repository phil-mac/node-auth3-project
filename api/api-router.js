const express = require('express')

const Recipes = require('./recipe-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Recipes.getRecipes()
    .then(recipes => {
        res.json({test});
    })
    .catch(err => {
        next(err)
    })
})

module.exports = router;