/*
 Created by Abdul Mueez
 Date: 23/05/2024
*/

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/user');
const Donation = require('../models/donation');
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);

const expect = chai.expect;

async function createTestAgent() {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync('testpassword', salt);
  const testAgent = new User({
    firstName: 'Test',
    lastName: 'Agent',
    email: 'testagent@example.com',
    password: hashedPassword,
    role: 'agent',
  });
  await testAgent.save();
  return testAgent;
}

describe('Agent Routes and Controllers', () => {
  let agent;

  before(async () => {
    agent = await createTestAgent();
  });

  after(async () => {
    await User.deleteMany({ email: 'testagent@example.com' });
  });

  describe('GET /agent/dashboard', () => {
    it('should render the agent dashboard page', async () => {
      const res = await chai.request(app)
        .get('/agent/dashboard')
        .set('Cookie', [`connect.sid=${agent.sessionID}`]);

      expect(res).to.have.status(200);
    });
  });

  describe('GET /agent/collections/pending', () => {
    it('should render the agent pending collections page', async () => {
      const donation = new Donation({
        donor: agent._id,
        agent: agent._id,
        status: 'assigned',
        phone: '1234567890',
        address: '221 Burwood Hwy',
        cookingTime: new Date(),
        quantity: 5,
        foodType: 'Canned Goods',
      });
      await donation.save();

      const res = await chai.request(app)
        .get('/agent/collections/pending')
        .set('Cookie', [`connect.sid=${agent.sessionID}`]);

      expect(res).to.have.status(200);
    });
  });

  describe('GET /agent/collection/view/:collectionId', () => {
    it('should render the collection details page', async () => {
      const donation = new Donation({
        donor: agent._id,
        agent: agent._id,
        status: 'assigned',
        phone: '1234567890',
        address: '221 Burwood Hwy',
        cookingTime: new Date(),
        quantity: 5,
        foodType: 'Canned Goods',
      });
      await donation.save();

      const res = await chai.request(app)
        .get(`/agent/collection/view/${donation._id}`)
        .set('Cookie', [`connect.sid=${agent.sessionID}`]);

      expect(res).to.have.status(200);
    });
  });

  describe('GET /agent/collection/collect/:collectionId', () => {
    it('should mark the collection as collected', async () => {
      const donation = new Donation({
        donor: agent._id,
        agent: agent._id,
        status: 'assigned',
        phone: '1234567890',
        address: '221 Burwood Hwy',
        cookingTime: new Date(),
        quantity: 5,
        foodType: 'Canned Goods',
      });
      await donation.save();

      const res = await chai.request(app)
        .get(`/agent/collection/collect/${donation._id}`)
        .set('Cookie', [`connect.sid=${agent.sessionID}`]);

      expect(res).to.have.status(200);
    });
  });
});
