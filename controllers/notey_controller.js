const express = require('express')
const Note = require('../models/notey.js')
const notey = express.Router()

notey.get('/new', (req, res) => {
  res.render(
    'notey/new.ejs' , {currentUser: req.session.currentUser}
  )
})

notey.get('/:id/edit', (req, res) => {
  Note.findById(req.params.id, (err, foundNote) => {
    res.render('notey/edit.ejs', {
      note: foundNote    , currentUser: req.session.currentUser
    })
  })
})

notey.delete('/:id', (req, res) => {
  Note.findByIdAndRemove(req.params.id, (err, removedNote) => {
    res.redirect('/notey')
  })
})

notey.get('/:id', (req, res) => {
  Note.findById(req.params.id, (err, foundNote) => {
    res.render('notey/show.ejs', {
      note: foundNote  , currentUser: req.session.currentUser
    })
  })
})

notey.put('/:id', (req, res) => {
  Note.findByIdAndUpdate( req.params.id, req.body, (err, newNote) => {
    res.redirect('/notey')

  })
})

notey.post('/', (req, res) => {
  Note.create(req.body, (err, newNote) => {
    res.redirect('/notey')
  })
})

notey.get('/', (req, res) => {
  Note.find({}, (err, allNotes) => {
    console.log(allNotes);
    console.log(req.session.currentUser);
    res.render('notey/index.ejs', {
      note: allNotes  ,
      currentUser: req.session.currentUser

    })
  })
})

module.exports = notey
