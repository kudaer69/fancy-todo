const { Todo } = require('../models');

class TodoController {
  static create (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);
    req.body.userId = req.decoded.id;
    console.log(req.body);
    Todo.create(req.body)
      .then(data => res.status(201).json({ data: data, message: `Success create ${data.title} todo` }))
      .catch(next)
  };

  static filter (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);

    Todo.findOne({ where: { id: req.params.id } })
      .then(data => res.json({ data: data, message: `Success read ${data.title} todo` }))
      .catch(next)
  };

  static read (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);

    Todo.findAll({ where: { userId: req.decoded.id }, order: [['due_date', 'ASC']] })
      .then(data => res.json({ data: data, message: `Success read ${data.length} todo` }))
      .catch(next)
  };

  static read_false (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);

    Todo.findAll({ where: { userId: req.decoded.id, status: false }, order: [['due_date', 'ASC']] })
      .then(data => res.json({ data: data, message: `Success read ${data.length} todo` }))
      .catch(next)
  };

  static read_true (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);

    Todo.findAll({ where: { userId: req.decoded.id, status: true }, order: [['due_date', 'ASC']] })
      .then(data => res.json({ data: data, message: `Success read ${data.length} todo` }))
      .catch(next)
  };

  static update (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);
    
    Todo.update(req.body, { where: { id: req.params.id, userId: req.decoded.id }, returning: true })
      .then(data => {
          if (data[0] != 1) throw { name: 404, message: `Todo with id: ${id} not found` };

          res.status(201).json({ data: data[1], message: `Success edit ${req.body.title} todo` })
        })
      .catch(next)
  };

  static update_status (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);
    const body = { status: true };

    Todo.update(body, { where: { id: req.params.id, userId: req.decoded.id }, returning: true })
      .then(data => {
        if (data[0] != 1) throw { name: 404, message: `Todo with id: ${id} not found` };
        console.log(data);
        res.status(201).json({ data: data[1], message: `Success finish todo` })
      })
      .catch(next)
  };

  static delete (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);
    let todo = {};

    Todo.findOne({ where: { id: req.params.id, userId: req.decoded.id } })
      .then(data => {
        if (!data) throw { name: 404, message: `Todo with id: ${id} not found` };
        todo = data;

        return Todo.destroy({ where: { id: req.params.id } })
      })
      .then(() => res.status(201).json({ message: `Success delete ${todo.title} todo` }))
      .catch(next)
  };
};

module.exports = TodoController;