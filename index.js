const
    path    = require('path'),
    express = require('express'),

    app = express(),

    PORT       = 3000;

app.use( express.static(__dirname + '/app') );
app.use('/', require('./index.routes')(express.Router()) );

app.get('/', (req, res) => res.render('index.html'));

app.listen(PORT, (err) => {
    if (err) console.error(err.toString())
    else console.info("Listening on port %s", PORT)
})
