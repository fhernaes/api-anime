const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); 

const { expect } = chai;

chai.use(chaiHttp);

describe('Probando respuesta de servidor para método get', () => {
    it('Comprueba que método get responde con un código 200 en la ruta /api/anime', (done) => {
      chai
        .request(app)
        .get('/api/anime')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  
  });
  