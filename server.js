const db = require('./db/connection');
const Actions = require('./lib/Actions');

db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
});

new Actions().chooseAction();