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

async function createTestAdmin() {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync('testpassword', salt);
  const testAdmin = new User({
    firstName: 'Test',
    lastName: 'Admin',
    email: 'testadmin@example.com',
    password: hashedPassword,
    role: 'admin',
  });
  await testAdmin.save();
  return testAdmin;
}

describe('Admin Routes and Controllers', () => {
  let admin;

  before(async () => {
    admin = await createTestAdmin();
  });

  after(async () => {
    await User.deleteMany({ email: 'testadmin@example.com' });
  });

  describe('GET /admin/dashboard', () => {
    it('should render the admin dashboard page', async () => {
      const res = await chai.request(app)
        .get('/admin/dashboard')
        .set('Cookie', [`connect.sid=${admin.sessionID}`]);

      expect(res).to.have.status(200);
    });
  });

  describe('GET /admin/donations/pending', () => {
    it('should render the admin pending donations page', async () => {
      const res = await chai.request(app)
        .get('/admin/donations/pending')
        .set('Cookie', [`connect.sid=${admin.sessionID}`]);

      expect(res).to.have.status(200);
    });
  });

  describe('GET /admin/donations/previous', () => {
    it('should render the admin previous donations page', async () => {
      const res = await chai.request(app)
        .get('/admin/donations/previous')
        .set('Cookie', [`connect.sid=${admin.sessionID}`]);

      expect(res).to.have.status(200);
    });
  });
});
