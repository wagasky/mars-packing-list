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
});