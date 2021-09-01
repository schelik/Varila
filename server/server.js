const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
require('dotenv').config();
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Document = require('./models/document');


mongoose.connect(process.env.mongoDB, {   useNewUrlParser: true,
    useUnifiedTopology: true, })
        .then(() => console.log("Connected to the DB"))
        .catch(error => console.log(error));

        
const io = require('socket.io')(3001, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

const defaultValue = ""

io.on("connection", socket => {
  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data })
    })
  })
})

async function findOrCreateDocument(id) {
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({ _id: id, data: defaultValue })
}


// middleware
app.use(express.json());
app.use(cors());



// routes        
app.use('/api/', auth);


const port = process.env.PORT
app.listen(port, () => {
    console.log(`The server is running on port ${port}...`);
})