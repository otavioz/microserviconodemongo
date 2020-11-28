const express = require('express')

const router = express.Router()

const Curso = require('../models/curso')


router.get('v1/Cursos/', async (req, res) => {
    try {
        const Cursos = await Curso.find()

        return res.send(Cursos)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})
router.get('v1/Cursos/:id', getCurso, async (req, res) => {

    res.json(res.Curso)
})
router.post('v1/Cursos/', async (req, res) => {

    const Curso = new Curso({
        name: req.body.name,
        channel: req.body.channel
    })

    try {
        const created = await Curso.save()

        res.status(201).json(created)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
})
router.patch('v1/Cursos/:id', getCurso, async (req, res) => {
    if (req.body.name != null) {
        res.Curso.name = req.body.name
    }

    if (req.body.channel != null) {
        res.Curso.channel = req.body.channel
    }

    try {
        const updated = await res.Curso.save()

        res.json(updated)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
})
router.delete('v1/Cursos/:id', getCurso, async (req, res) => {

    try {
        await res.Curso.remove()

        res.json({message: 'Deleted Successfully'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getCurso(req, res, next) {
    try {
        Curso = await Curso.findById(req.params.id)

        if (Curso == null) {
            return res.status(404).json({message: 'Curso not found'})
        }
    }catch (err) {
        res.status(500).json({message: err.message})
    }

    res.Curso = Curso

    next()
}

module.exports = router