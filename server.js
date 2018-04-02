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
  console.log('get was called')
  database('items')
    .select()
    .then(items => {
      response.status(200).json(items);
    })
    .catch(error => {
      reponse.status(500).json({ error });
    })
});


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

// delete

app.delete('/api/v1/items/:id', (request, response) => {
  const { id } = request.params
  
  database('items').where("id", id).del()
    .then( deleted => {
      if (!deleted) {
        return response.status(404).json({error: 'no item to delete'})
      }
      response.status(204).json(deleted)
    })
    .catch( error => { 
      response.status(500).json({ error })
    });
});

// patch or put request

app.patch('/api/v1/items/:id', (request, response) => {
  const { id } = request.params;
  const { name, packed } = request.body;
  database('items')
    .where('id', id)
    .update({
      name,
      packed
    })
    .then(updated => {
      if (!updated) {
        return response.status(422).json({ error: 'unable to update item' });
      }
      response.status(200).json('Database successfully updated');
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`)
});

module.exports = app;