const express = require('express');
const router = express.Router();

const Movie = require('../models/movie');

// Handle GET request for website root
router.get('/', (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render('movies/index', { movies });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/create', (req, res, next) => {
  res.render('movies/create');
});

router.post('/create', (req, res, next) => {
  const data = req.body;
  Movie.create({
    title: data.title,
    genre: data.genre,
    plot: data.plot
  })
    .then(movie => {
      console.log('Movie created', movie);
      res.redirect('/movies');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Movie.findById(id)
    .then(movies => {
      res.render('movies/show', { movies });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;

  Movie.findById(id)
    .then(movies => {
      res.render('movies/edit', { movies });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  const { title, genre, plot } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot })
    .then(movie => {
      console.log('celeb updated sucessfully', movie);
      res.redirect('/movies');
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Movie.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/movies');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
