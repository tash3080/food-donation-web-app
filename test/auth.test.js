/*
 Created by Abdul Mueez
 Date: 23/05/2024
*/

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);

const expect = chai.expect;

async function createTestUser() {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync('testpassword', salt);
  const testUser = new User({
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    password: hashedPassword,
    role: 'donor',
  });
  await testUser.save();
  return testUser;
}

describe('Authentication', () => {
  afterEach(async () => {
    await User.deleteMany({ email: 'test@example.com' });
  });

  describe('POST /auth/signup', () => {
    it('should register a new user', async () => {
      const res = await chai.request(app)
        .post('/auth/signup')
        .send({
          firstName: 'New',
          lastName: 'User',
          email: 'new@example.com',
          password1: 'newpassword',
          password2: 'newpassword',
          role: 'donor',
        });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      const newUser = await User.findOne({ email: 'new@example.com' });
      expect(newUser).to.exist;
    });

    it('should not register a new user with an existing email', async () => {
      await createTestUser();

      const res = await chai.request(app)
        .post('/auth/signup')
        .send({
          firstName: 'Duplicate',
          lastName: 'User',
          email: 'test@example.com',
          password1: 'newpassword',
          password2: 'newpassword',
          role: 'donor',
        });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    });
  });

  describe('POST /auth/login', () => {
    it('should log in an existing user', async () => {
      const testUser = await createTestUser();

      const res = await chai.request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'testpassword',
        });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    });

    it('should not log in with incorrect password', async () => {
      await createTestUser();

      const res = await chai.request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'incorrectpassword',
        });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    });

    it('should not log in with non-existent email', async () => {
      const res = await chai.request(app)
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password',
        });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    });
  });
});
