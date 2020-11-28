const express = require('express')

const router = express.Router()

const Aluno = require('../models/aluno')

// GET all
router.get('v1/alunos/', async (req, res) => {
    try {
        const Alunos = await Aluno.find()

        return res.send(Alunos)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})

// GET by ID
router.get('v1/alunos/:id', getAluno, async (req, res) => {

    res.json(res.Aluno)
})

// POST create
router.post('v1/alunos/', async (req, res) => {

    const Aluno = new Aluno({
        name: req.body.name,
        channel: req.body.channel
    })

    try {
        const created = await Aluno.save()

        res.status(201).json(created)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
})

// PATCH update
router.patch('v1/alunos/:id', getAluno, async (req, res) => {
    if (req.body.name != null) {
        res.Aluno.name = req.body.name
    }

    if (req.body.channel != null) {
        res.Aluno.channel = req.body.channel
    }

    try {
        const updated = await res.Aluno.save()

        res.json(updated)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
})

// DELETE remove
router.delete('v1/alunos/:id', getAluno, async (req, res) => {

    try {
        await res.Aluno.remove()

        res.json({message: 'Deleted Successfully'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// middleware
async function getAluno(req, res, next) {
    try {
        Aluno = await Aluno.findById(req.params.id)

        if (Aluno == null) {
            return res.status(404).json({message: 'Aluno not found'})
        }
    }catch (err) {
        res.status(500).json({message: err.message})
    }

    res.Aluno = Aluno

    next()
}

// export
module.exports = router