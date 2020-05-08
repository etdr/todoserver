
const express = require('express');
let router = express.Router();

let seq = require('../db');
let TodoModel = seq.import('../models/todo');





router.post('/', (req, res) => {
  const desc = req.body.todoitem.description;
  const userid = req.user.id;
  let parent = req.body.todoitem.parent;
  if (!req.body.todoitem.parent) {
    parent = null;
  }

  TodoModel.create({
    description: desc,
    completed: 'u',
    parentitem: parent,
    userId: userid
  }).then(data => res.send(data));
});


router.get('/', (req, res) => {
  const userid = req.user.id;

  TodoModel.findAll({
    where: { userId: userid }
  }).then( data => {
    res.json(data);
  }, error => {
    res.status(500).send(error.message + "aaaaaa");
  });
});





router.get('/:id', (req, res) => {
  const id = req.params.id;
  const userid = req.user.id;

  TodoModel.findOne({
    where: { id: id, userId: userid }
  }).then( data => {
    res.json(data);
  }, error => {
    res.status(500).send(error.message);
  });
});

router.get('/:id/tags', (req, res) => {
  const id = req.params.id;
  const userid = req.user.id;

  TodoModel.findOne({
    where: { id, userId: userid }
  }).then( data => {
    res.json(data.tags);
  }, error => {
    res.status(500).send(error.message);
  });
});



router.put('/:id', (req, res) => {
  const id = req.params.id;
  const userid = req.user.id;
  let desc = req.body.todoitem.description;
  let parent = req.body.todoitem.parent;
  let completed = req.body.todoitem.completed;
  let ord = req.body.todoitem.order;
  let tags = req.body.todoitem.tags;
  let priority = req.body.todoitem.priority;
  

  TodoModel.findOne({
    where: { id: id, userId: userid }
  }).then( data => {
    if (!desc) desc = data.description;
    if (!parent) parent = data.parent;
    if (!completed) completed = data.completed;
    if (!ord) ord = data.ord;
    if (!tags) tags = data.tags;
    if (!priority) priority = data.priority;

    return TodoModel.update({
      description: desc,
      parent,
      completed,
      ord,
      tags,
      priority
    }, { where: { id } });
  }).then( response => {
    res.json(response);
  }, error => {
    res.status(500).send(error.message);
  });

    
});

router.put('/:id/tags', (req, res) => {
  const id = req.params.id;
  const userid = req.user.id;
  const newTag = req.body.todoitem.newTag;

  TodoModel.findOne({
    where: { id, userId: userid }
  }).then( data => {
    data.tags.push(newTag);
    return TodoModel.update({
      tags: data.tags
    }, {
      where: { id }
    })
  }).then( r => res.json(r),
           err => res.status(500).json(err))
});




router.delete('/delete/:id', (req, res) => {
  TodoModel.destroy({
    where: {id: req.params.id, userId: req.user.id}
  }).then(r => res.json(r),
          err => res.status(500).send(err.message));
});

router.delete('/delete/:id/tags/:tag', (req, res) => {
  TodoModel.findOne({
    where: { id: req.params.id, userId: req.user.id }
  }).then( data => {
    let ts = data.tags.filter(x => x !== req.params.tag);
    return TodoModel.update({
      tags: ts
    }, {
      where: {id: req.params.id}
    });
  }).then(r => res.json(r),
          err => res.status(500).send(err));
});


router.delete('/clearcomplete', (req, res) => {
  console.log(req.user.id);
  TodoModel.destroy({
    where: {userId: req.user.id, completed: 'c'}
  }).then(r => res.json(r),
          err => res.status(500).send(err.message));

});





module.exports = router;


