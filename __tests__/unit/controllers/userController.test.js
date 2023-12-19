const request = require('supertest');
const app = require('../../../app'); 
const userController = require('../../../controllers/users'); 
const User = require('../../../models/User'); 
const {generateToken} = require("../../../utils/generateToken")

jest.mock('express-async-handler', () => (handler) => (req, res, next) => handler(req, res, next));
jest.mock('../../../utils/generateToken', () => (res, userId) => {}); 


describe('authUser', () => {
  const mockUserData = {
    _id: 'mockUserId',
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    save: jest.fn(), 
    matchPassword: jest.fn(), 
  };

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

describe('registerUser', () => {
  const mockUserData = {
    _id: 'mockUserId',
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    save: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user and return user data with a token', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(User, 'create').mockResolvedValueOnce(mockUserData);

    const response = await request(app)
      .post('/user')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id', 'name', 'email');
  });

  it('should handle existing user and return a 400 status with error message', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValueOnce(mockUserData);

    const response = await request(app)
      .post('/user')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'User already exists');
  });

  it('should handle invalid user data and return a 400 status with error message', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(User, 'create').mockResolvedValueOnce(null);

    const response = await request(app)
      .post('/user')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid user Data');
  });
});

describe('logoutUser', () => {
  it('should log out the user and return a success message', async () => {
    const response = await request(app).post('/user/logout');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User logged out');
  });
});


describe('updateUserProfile', () => {
  const mockUser = {
    _id: 'mockUserId',
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    save: jest.fn(),
  };

  beforeAll(async () => {

  });

  afterAll(async () => {

  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update the user profile and return updated user data', async () => {
    jest.spyOn(User, 'findById').mockResolvedValueOnce(mockUser);
    jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

    mockUser.save.mockResolvedValueOnce(mockUser);

    const response = await request(app)
      .patch('/user/profile')
      .send({
        _id: 'mockUserId',
        name: 'Updated Name',
        email: 'updated.email@example.com',
        password: 'newpassword',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      _id: 'mockUserId',
      name: 'Updated Name',
      email: 'updated.email@example.com',
    });

    expect(User.findById).toHaveBeenCalledWith('mockUserId');
    expect(mockUser.name).toBe('Updated Name');
    expect(mockUser.email).toBe('updated.email@example.com');
    expect(mockUser.password).toBe('newpassword');
  });

  it('should handle user not found and return a 404 status with error message', async () => {
    jest.spyOn(User, 'findById').mockResolvedValueOnce(null);

    const response = await request(app)
      .patch('/user/profile')
      .send({
        _id: 'nonexistentUserId',
        name: 'Updated Name',
        email: 'updated.email@example.com',
        password: 'newpassword',
      });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'User not found');
    expect(User.findById).toHaveBeenCalledWith('nonexistentUserId');
  });
});








