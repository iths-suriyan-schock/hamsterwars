
const express = require('express');
const app = express();
// require('./initdb')

// ROUTES
const hamstersRoute = require('./routes/hamsters');
const chartsRoute = require('./routes/charts')
const gamesRoute = require('./routes/games')
const statsRoute = require('./routes/stats')

//app.use = Bind app-lvl middleware to an instance of the app object
app.use(express.json());
app.use('/assets', express.static("assets"))
app.use(express.static('public'))

app.use('/hamsters', hamstersRoute)
app.use('/charts', chartsRoute)
app.use('/games', gamesRoute)
app.use('/stats', statsRoute)

app.listen(3000, () => {
    console.log('Server is operational at port 3000.')
})