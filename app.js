var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
const session = require('express-session');

//เพิ่ม
var indexRouter = require('./routes/index');
var breeddogRouter = require('./routes/breeddog');
var breedRouter = require('./routes/breed');
var formRouter = require('./routes/form');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');





var app = express();
const sessionConfig = {
  secret: 'secret',
  resave: true, // บันทึก session ทุกครั้งที่มีการร้องขอ
  saveUninitialized: true, // บันทึก session ทุกครั้งที่มีการร้องขอ โดยไม่คำนึงว่า session จะมีข้อมูลหรือไม่
};

app.use(session(sessionConfig));

app.use(function(req, res, next) {
  res.locals.sessions = req.session
  res.locals.cookies = req.cookies
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//เพิ่ม
app.use('/', indexRouter);
app.use('/form', formRouter); 
app.use('/breeddog', breeddogRouter);
app.use('/breed', breedRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/adminhome', (req, res) => {
  res.render('adminhome', { email: 'Natcha@gmail.com' });
});

const uri = "mongodb+srv://natcha:natcha789@cluster0.xsetczz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" 
mongoose.connect(uri)
.then((result)=> app.listen(8000, () => {
  console.log('API is running on ports 8000 http://localhost:8000/');
}))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;