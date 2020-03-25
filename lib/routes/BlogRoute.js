const { Router } = require('express');
const Blog = require('../models/Blog');

module.exports = Router()
  .post('/', (req, res, next) => {
    Blog
      .create(req.body)
      .then(Blog => res.send(blog))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Blog
      .findById(req.params.id)
      .populate('comments')
      .then(Blog => res.send(blog))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Blog
      .find()
      .then(Blogs => res.send(blogs))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Blog
      .findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true })
      .then(Blog => res.send(blog))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Blog
      .findByIdAndDelete(req.params.id)
      .then(Blog => res.send(blog))
      .catch(next);
  });