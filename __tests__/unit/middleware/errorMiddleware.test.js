const errorMiddleware = require('../../../middleware/errorMiddleware');
const { notFound, errorHandler } = errorMiddleware;

describe('notFound middleware', () => {
  it('should call next with an error containing 404 status and a "Not found" message', () => {
    const req = { originalUrl: '/nonexistent-route' };
    const res = { status: jest.fn(), json: jest.fn() };
    const next = jest.fn();

    notFound(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
