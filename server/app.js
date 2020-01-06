const server                        = require('express');
const app                           = server();
const bodyParser                    = require('body-parser')

const { PORT }                      = require('./config');
const { connectDatabase }           = require('./config/connect-db');
connectDatabase();

const { USER_ROUTER }               = require('./routes/home');

// template ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(server.static('public'))

app.get('/home', (req, res) => {
    res.render('index');
})


app.use(bodyParser.urlencoded({ extended: true }));


app.use(USER_ROUTER);


app.get('*', (req, res) => res.json({ error: false, data: `App is running at port ${PORT}` }));

app.listen(PORT, () => console.log(`App is running at port ${PORT}`));