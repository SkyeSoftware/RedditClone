export const sauceMock: {
  [key: string]: jest.Mock;
} = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  patch: jest.fn(),
  setHeader: jest.fn(),
  addMonitor: jest.fn(),
  addResponseTransform: jest.fn(),
};
