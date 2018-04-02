const $ = require("jquery");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(express.static('public'))
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3001);
app.locals.title = "Mars Packing List";

app.get('/api/v1/items', (request, response) => {
  
});

// get

app.post('/api/v1/items', (request, response) => {
  const item  = request.body 
  const { name, packed } = item
  const newItem = { name, packed }
  console.log(newItem)
  for(let requiredParameter of ['name']) {
    if(!newItem[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `You're missing a "${requiredParameter}"`})
    }
  }
    database('items').insert(newItem, 'id')
    .then(item => {
      response.status(201).json({ id: item[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});
// post
// delete
// patch or put request

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`)
});

module.exports = app;