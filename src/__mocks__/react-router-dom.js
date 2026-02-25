module.exports = {
  useParams: jest.fn(),
  useNavigate: jest.fn(),
  BrowserRouter: ({ children }) => children,
  Link: ({ children, to }) => children,
  Route: ({ children }) => children,
  Routes: ({ children }) => children,
  MemoryRouter: ({ children }) => children,
};
