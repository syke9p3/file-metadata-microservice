const express = require('express');
const cors = require('cors');
require('dotenv').config()


const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  console.log('Uploading...');
  console.log(req.body);
  console.log(req.file);

  const { originalname: name, mimetype: type, size } = req.file;

  res.json({ name, type, size });
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
