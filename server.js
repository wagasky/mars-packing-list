const $ = require("jquery");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(express.static('public'))
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);
app.locals.title = "Mars Packing List";

app.get('/api/v1/items', (request, response) => {
  
});

// get

app.post('/api/v1/items', (request, response) => {
  // const item = request.body;
  // for(let requiredParameter of ['name']) {
  //   if(!projects[requiredParameter]) {
  //     return response
  //       .status(422)
  //       .send({ error: `You're missing a "${requiredParameter}"`})
  //   }
  // }
  //   database('mars_packing_list').insert(item, 'id')
  //   .then(item => {
  //     response.status(201).json({ id: item[0] })
  //   })
  //   .catch(error => {
  //     response.status(500).json({ error });
  //   });
  console.log('post was called')
  });
// post
// delete
// patch or put request

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`)
});

module.exports = app;