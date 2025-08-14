const express = require('express')
const { nodes, edges } = require('./BaseDeDados/db')
const app = express()
const port = 3000

const verticie = require('./BaseDeDados/db').nodes
const arestas = require('./BaseDeDados/db').edges

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/dados', (req, res) => {

  res.json({
    nodes: verticie,
    edges: arestas
  })
})

app.get('/', (req, res) => {
  res.render('index', { title: 'Projeto Grafo' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})