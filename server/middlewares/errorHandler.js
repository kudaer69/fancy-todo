const errorHandler = (err, req, res, next) => {
  console.log(err, '=====');
  if (err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError') {
    let errArr = [];
    
    err.errors.forEach(el => {
      errArr.push(el.message);
    });

    res.status(400).json(errArr)
  } else if (err.name == 404 || err.name == 401 || err.name == 400) res.status(+err.name).json([ err.message ])
  else res.status(500).json(['Internal server error']);
};

module.exports = {
  errorHandler
};