// Middleware tipo error para loggear errores
function logErrors(err, req, res, next) {
  console.log('logErrors');
  console.error(err); //mostrar el error en servidor para poder monitorearlo
  next(err);
}

// Middleware tipo error para crear un standard de formato
function errorHandler(err, req, res, next) { //así no se utilice next en el código se debe poner aqui, ya que un middleware de error tiene los cuatro parámetros
  console.log('errorHandler');
  res.status(500).json({ //indicar que el error es estatus 500 Internal Server Error
    message: err.message, //mostrar al cliente el mensaje de error
    stack: err.stack, //mostrar info del error
  })
}

function boomErrorHandler(err, req, res, next) {
  console.log('boomErrorHandler');
  if (err.isBoom){
    const { output } =  err;
    res.status(output.statusCode).json(output.payload);
  }
  else {
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler}; //exportarlo como modulo
