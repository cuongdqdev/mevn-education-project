const server                        = require('express');
const app                           = server();

const { PORT }                      = require('./config');
const { connectDatabase }           = require('./config/connect-db');
connectDatabase();

app.get('*', (req, res) => res.json({ error: false, data: `App is running at port ${PORT}` }));

app.listen(PORT, () => console.log(`App is running at port ${PORT}`));