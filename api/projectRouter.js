const express = require('express');

const projectMethods = require('../data/helpers/projectModel')
const actionMethods = require('../data/helpers/actionModel')

const router = express.Router();

// Request Endpoints -----------------------------------------------//
router.get('/', (req, res, next) => {

    projectMethods.get()
    .then(r => res.status(200).json({ msg: "Request successful, see actions", r}))
    .catch(e => res.status(500).json({ msg: 'Whoops, something went wrong on our side'}))
})

router.get('/:id', validateId, (req, res, next) => {
    const { id } = req.params

    projectMethods.get(id)
    .then(r => res.status(200).json({ msg: "Request successful, see actions", r}))
    .catch(e => res.status(500).json({ msg: 'Whoops, something went wrong on our side'}))
})

router.get('/:id/actions', validateId, (req, res, next) => {
    req.body.project_id = req.params.id

    projectMethods.getProjectActions(req.body.project_id)
    .then(r => res.status(200).json({ msg: "Request successful, see actions", r}))
    .catch(e => res.status(500).json({ msg: 'Whoops, something went wrong on our side'}))
})

router.post('/', (req, res, next) => {
    const { name, description } = req.body

    if (name && description) {
        projectMethods.insert(req.body)
        .then(r => res.status(200).json({ msg: "Request successful, see actions", r}))
        .catch(e => res.status(500).json({ msg: 'Whoops, something went wrong on our side'}))
    } else {
        res.status(400).json({ msg: 'A name and a description is required'})
    }
})

router.post('/:id/actions', (req, res, next) => {
    const { notes, description } = req.body
    req.body.project_id = req.params.id

    if ( description && notes && description.length < 128 ) {
        actionMethods.insert(req.body)
        .then(r => res.status(200).json({ msg: "Request successful, see actions", r}))
        .catch(e => {
            console.log(req.body, e)
            res.status(500).json({ msg: 'Whoops, something went wrong on our side', error: e})})
    } else {
        res.status(400).json({ msg: 'A description under 128 characters, and notes are required'})
    }
})

router.delete('/:id', validateId, (req, res, next) => {
    const { id } = req.params

    projectMethods.remove(id)
    .then(r => res.status(200).json({ msg: "Request successful, see actions", r}))
    .catch(e => res.status(500).json({ msg: 'Whoops, something went wrong on our side'}))
})

router.put('/:id', validateId, (req, res, next) => {
    const { id } = req.params
    // const { name, description } = req.body

    if ( req.body ) {
        projectMethods.update(id, req.body)
        .then(r => res.status(200).json({ msg: "Request successful, see actions", r}))
        .catch(e => {
            console.log(e)
            res.status(500).json({ msg: 'Whoops, something went wrong on our side'})})
    } else {
        res.status(400).json({ msg: 'A name, and a description is required'})
    }
})


// Middleware -----------------------------------------------//
function validateId (req, res, next) {
    // function checks if the project id request is a valid id
    const { id } =  req.params

    if (id) {
      projectMethods.get(id)
        .then(r => { 
          r ? next() : res.status(400).json({ msg: 'Invalid project ID'})
         })
        .catch(e=> res.status(500).json({ msg: 'Whoops, something went wrong on our side'}))
    } else {
      res.status(400).json({ msg: 'Invalid project ID'})
    }
}

// Export -----------------------------------------------//
module.exports = router