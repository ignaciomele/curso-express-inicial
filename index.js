/*const http = require('http')

const server= http.createServer((req, res) => {
    res.status = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello world')
})

server.listen(3000, () => {
    console.log('server on port 3000')
})
*/

const express = require('express')
const morgan = require('morgan')
const { ppid, allowedNodeEnvironmentFlags } = require('process')
const app = express()

// SETTINGS

app.set('appName','nacho express')
app.set('port', 3000)
app.set('view engine', 'ejs')

// MIDDLEWARES

/*function logger(req, res, next) {
    console.log('request received')
    next()
}*/

app.use(express.json())
/*app.use((req, res, next) => {
    console.log(`route received: ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next()
})*/

app.use(morgan('dev'))

//ROUTES

/*app.all('/user', (req, res, next) => {
    console.log('Por aqui paso')
    next()
})*/

app.get('/', (req, res) => {
    const data= [{name: 'john'}, {name: 'joe'}, {name: 'cameron'}, {name: 'Ryan'}]
    res.render('index.ejs', {people: data})
})
app.get('/user', (req, res) => {
    res.json({
        username: 'Cameron',
        lastname: 'Howe'
    })
})

app.post('/user/:id', (req, res) => {
    console.log(req.body)
    console.log(req.params)
    res.send('post request received')
})

app.put('/user/:id', (req, res) => {
    console.log(req.body)
    res.send(`user ${req.params.id} updated`)
})

app.delete('/user/:userId', (req, res) => {
    res.send(`user ${req.params.userId} deleted`)
})

app.use(express.static('public'))

app.listen(app.get('port'), () => {
    console.log(app.get('appName'))
    console.log('Server on port', app.get('port'))
})

