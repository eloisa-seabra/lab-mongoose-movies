const express = require('express');
const router = express.Router();

const Celebrity = require('../models/celebrity');

// Handle GET request for website root
router.get('/', (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render('celebrities/index', { celebrities });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/create', (req, res, next) => {
  res.render('celebrities/create');
});

router.post('/create', (req, res, next) => {
  const data = req.body;
  Celebrity.create({
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase
  })
    .then(celebrity => {
      console.log('Celeb created', celebrity);
      res.redirect('/celebrities');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then(celebrities => {
      res.render('celebrities/show', { celebrities });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;

  Celebrity.findById(id)
    .then(celebrities => {
      res.render('celebrities/edit', { celebrities });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase })
    .then(celebrity => {
      console.log('celeb updated sucessfully', celebrity);
      res.redirect('/celebrities');
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
