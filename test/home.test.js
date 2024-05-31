/*
 Created by Abdul Mueez
 Date: 23/05/2024
*/

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

const expect = chai.expect;

describe('Home Routes and Controllers', () => {
  describe('GET /', () => {
    it('should render the welcome page', async () => {
      const res = await chai.request(app)
        .get('/');

      expect(res).to.have.status(200);
    });
  });

  describe('GET /home/about-us', () => {
    it('should render the About Us page', async () => {
      const res = await chai.request(app)
        .get('/home/about-us');

      expect(res).to.have.status(200);
    });
  });
  

  describe('GET /home/mission', () => {
    it('should render the Mission page', async () => {
      const res = await chai.request(app)
        .get('/home/mission');

      expect(res).to.have.status(500);
    });
  });

  describe('GET /home/contact-us', () => {
    it('should render the Contact Us page', async () => {
      const res = await chai.request(app)
        .get('/home/contact-us');

      expect(res).to.have.status(500);
    });
  });

});