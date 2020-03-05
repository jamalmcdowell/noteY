const express = require('express')
const Note = require('../models/notey.js')
const notey = express.Router()

const isAuthenticated = (req,res,next) => {
  if (req.session.currentUser) {
    return next()
  }else {
    res.redirect('/sessions/new')
  }
}

notey.get('/new', isAuthenticated, (req, res) => {
  res.render(
    'notey/new.ejs' , {

      currentUser: req.session.currentUser}
    )
  })

  notey.get('/:id/edit', isAuthenticated, (req, res) => {
    Note.findById(req.params.id, (err, foundNote) => {
      res.render('notey/edit.ejs', {
        note: foundNote    , currentUser: req.session.currentUser
      })
    })
  })

  notey.delete('/:id', isAuthenticated, (req, res) => {
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

  notey.put('/:id', isAuthenticated, (req, res) => {
    Note.findByIdAndUpdate( req.params.id, req.body, (err, newNote) => {
      res.redirect('/notey')

    })
  })

  notey.post('/', isAuthenticated, (req, res) => {
    Note.create(req.body, (err, newNote) => {
      res.redirect('/notey')

    })
  })

  notey.get('/', (req, res) => {
    Note.find({}, (err, allNotes) => {
      if (req.session.currentUser) {
        res.render('notey/index.ejs', {
          user: req.session.currentUser.username,
          note: allNotes,
          currentUser: req.session.currentUser
        })



      }
      else


      // console.log(allNotes);
      res.render('notey/index.ejs', {
        note: allNotes  ,
        currentUser: req.session.currentUser
      })
    })
  })

  notey.get('/setup/seed', (req, res) => {
    Note.create(
      [
        {
          title: 'Oh',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
          title: 'KickFlip',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          image: 'https://scene7.zumiez.com/is/image/zumiez/pdp_hero/Landyachtz-Battle-Axe-Fox-38%22-Drop-Through-Longboard-Complete-_312467-front-US.jpg'
        },
        {
          title: 'Skating',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          image: 'https://scene7.zumiez.com/is/image/zumiez/pdp_hero/Santa-Cruz-Sunset-Dot-39%22-Longboard-Complete-_323474-front-US.jpg'
        }

      ],
      (error, data) => {
        console.log(error);
        res.redirect('/notey')
      }
    )
  })
  module.exports = notey
