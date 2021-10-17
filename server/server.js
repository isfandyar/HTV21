const express = require('express')
var cors = require('cors')

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream } = require('./s3')

const app = express()

app.use(cors())

app.get('/images/:key', (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
})

app.post('/upload', upload.single(''), async (req, res) => {
  const file = req.file
  console.log(file)


  const result = await uploadFile(file)
  await unlinkFile(file.path)
  console.log(result)
  res.send(result.Location)
})

app.listen(8080, () => console.log("listening on port 8080"))