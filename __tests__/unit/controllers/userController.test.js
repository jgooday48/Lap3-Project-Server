const request = require('supertest');
const app = require('../../../app'); 
const userController = require('../../../controllers/users'); 
const User = require('../../../models/User'); 

jest.mock('express-async-handler', () => (handler) => (req, res, next) => handler(req, res, next));
jest.mock('../../../utils/generateToken', () => (res, userId) => {}); 

describe('userController Tests', () => {
  const mockUserData = {
    _id: 'mockUserId',
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    save: jest.fn(), 
    matchPassword: jest.fn(), 
  };

  describe('authUser', () => {
    it('should authenticate a user and return a token', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(mockUserData);

      mockUserData.matchPassword.mockResolvedValueOnce(true);

      const response = await request(app)
        .post('/user/auth')
        .send({
          email: 'john.doe@example.com',
          password: 'password123',
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('_id', 'name', 'email');
    });

    it('should return 401 for invalid credentials', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

      const response = await request(app)
        .post('/user/auth')
        .send({
          email: 'john.doe@example.com',
          password: 'invalidPassword',
        });

      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty('message', 'Invalid email or password');
    });
  });

});











