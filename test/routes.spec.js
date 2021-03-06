const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {
  beforeEach(done => {
    database.migrate.rollback().then(() => {
      database.migrate.latest().then(() => {
        return database.seed.run().then(() => {
          done();
        });
      });
    });
  });

  it('should return 404', () => {
    return chai
      .request(server)
      .get('/sad')
      .then(response => {
        response.should.have.status(404);
      })
      .catch(error => {
        throw error;
      });
  });
});


describe('API ROUTES', () => {
  
  beforeEach(done => {
    database.migrate.rollback().then(() => {
      database.migrate.latest().then(() => {
        return database.seed.run().then(() => {
          done();
        });
      });
    });

  });

  describe('GET /api/v1/items', () => {
    it('should return all items', () => {
      return chai
        .request(server)
        .get('/api/v1/items/')
        .then(response => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.a('array');
          expect(response.body[0]).to.have.property('id');
          expect(response.body[0]).to.have.property('name');
          expect(response.body[0]).to.have.property('packed');
        })
        .catch(error => {
          throw error;
        });
    });


    it('should not return items if called with the wrong params', () => {
      return chai
        .request(server)
        .get('/api/v1/items$%##*&$^#')
        .then(response => {
          expect(response).to.have.status(404);
        });
    });
  });


  describe('POST /api/v1/items', () => {
    it('should post a new item that has complete params', () => {
      return chai
        .request(server)
        .post('/api/v1/items')
        .send({
          name: 'Spaceship',
          packed: false,
        })
        .then(response => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(2);
        })
        .catch(err => {
          throw err;
        });
    });

    it('should not create a new item if called with incorrect params', () => {
      return chai
        .request(server)
        .post('/api/v1/items')
        .send({
          packed: false,
        })
        .then(response => {
          response.should.have.status(422);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.error.should.equal(`You're missing a "name"`);
        })
        .catch(err => {
          throw err;
        });
    });
  });


describe('DELETE /api/v1/items/:id', () => {
    it('should delete an item', () => {
      return chai
        .request(server)
        .delete('/api/v1/items/1')
        .then(response => {
          expect(response).to.have.status(204);
        });
    });

    it('should return 404 if delete item is incorrect', () => {
      return chai
        .request(server)
        .delete('/api/v1/items/99999999999')
        .then(response => {
          expect(response).to.have.status(404);
        });
    });
  });

describe('PATCH /api/v1/items/:id', () => {
    it('should update the expected item', () => {
      return chai
        .request(server)
        .patch('/api/v1/items/1')
        .send({ name: 'Brand New Spaceship'})
        .then(response => {
          response.should.have.status(200);
          expect(response.body).to.equal('Database successfully updated');
        });
    });

    it('should return 422 if no record was updated', () => {
      return chai
        .request(server)
        .patch('/api/v1/items/1000000000000')
        .send({ 
          name: 'Brand New Spaceship',
          packed: true
        })
        .then(response => {
          response.should.have.status(404);
        });
    });
  });

});