/* eslint-disable linebreak-style */
const express  = require('express')
const cors = require('cors')

const app = express()
const Loger = require('./logerMidleware')
//dsadsa
app.use(cors())  
app.use(express.json())
app.use(Loger)

let notes = [
  {
    'id': 1,
    'content': 'Me tengo que suscribir a midudev en Youtube i twitch',
    'date': '10-05-2021',
    'important': true
  },
  {
    'id': 2,
    'content': 'Tengo que estudiar las clases de fullstack bootcamp',
    'date': '10-05-2021',
    'important': false
  },
  {
    'id': 3,
    'content': 'Repasar los retos de Js de midudev',
    'date': '10-05-2021',
    'important': true
  }
]

app.get('/', (request, response) => {
  response.send('Hello word desde express')
})

app.get('/api/notes', (request, response, next) => {
  response.json(notes)
  next()
})

app.get('/api/notes/:id', (req, response) => {
  const id = parseInt(req.params.id)
  const note = notes.find(note => note.id === id)

  if(note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = parseInt(request.params.id)
  notes = notes.filter(note => note.id != id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body
  if(!note || !note.content){
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newnote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important != 'undefined' ? note.important : false
  }

  notes = [...notes, newnote]

  response.status(201).json(newnote)
})

app.use((request, response) => {
  response.status(404).json({
    error : 'NOT FOUND'
  }) 
})

const Port = 3001
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`)
})
