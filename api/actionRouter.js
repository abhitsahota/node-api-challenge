// Imports and Setup -----------------------------------------------//
const express = require('express');
const actionMethods = require('../data/helpers/actionModel')
const router = express.Router();

// Request Endpoints -----------------------------------------------//
router.get('/', (req, res, next) => {

    actionMethods.get()
    .then(r => res.status(200).json({ msg: "Request successful, see actions", r}))
    .catch(e => res.status(500).json({ msg: 'Whoops, something went wrong on our side'}))
})

router.get('/:id', validateId, (req, res, next) => {
    const { id } = req.params

    actionMethods.get(id)
    .then(r => res.status(200).json({ msg: "Request successful, see actions", r}))
    .catch(e => res.status(500).json({ msg: 'Whoops, something went wrong on our side'}))
})

router.delete('/:id', validateId, (req, res, next) => {
    const { id } = req.params

    actionMethods.remove(id)
    .then(r => res.status(200).json({ msg: "Request successful, see actions", r}))
    .catch(e => res.status(500).json({ msg: 'Whoops, something went wrong on our side'}))
})

router.put('/:id', validateId, (req, res, next) => {
    const { id } = req.params
    const { description } = req.body

    if (description || notes || completed) {
        actionMethods.update(id, req.body)
        .then(r => res.status(200).json({ msg: "Request successful, see actions", r}))
        .catch(e => {
            console.log(req.body, e)
            res.status(500).json({ msg: 'Whoops, something went wrong on our side', error: e})})
    } else {
        res.status(400).json({ msg: 'A description under 128 characters is required'})
    }
})


// Middleware -----------------------------------------------//
function validateId (req, res, next) {
    // function checks if the id request is a valid id
    const { id } =  req.params

    if (id) {
      actionMethods.get(id)
        .then(r => { 
          r ? next() : res.status(400).json({ msg: 'Invalid action ID'})
         })
        .catch(e=> res.status(500).json({ msg: 'Whoops, something went wrong on our side'}))
    } else {
      res.status(400).json({ msg: 'Invalid action ID'})
    }
}

// Export -----------------------------------------------//
module.exports = router