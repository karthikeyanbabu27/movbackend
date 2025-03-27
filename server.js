const http = require('http');
require('dotenv').config();
const getReq = require('./methods/get-req');
const postReq = require('./methods/post-req');
const putReq = require('./methods/put-req');
const deleteReq = require('./methods/del-req');
const movies = require('./data/movies.json');
const { writeToFile } = require('./util/write-tofile');

const PORT = process.env.PORT || 5001;

// Enable CORS middleware
const enableCors = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

const handleRequest = async (req, res) => {
  // Enable CORS
  enableCors(req, res);

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // Set common headers
  res.setHeader('Content-Type', 'application/json');
  
  // Attach movies data and helper functions to request object
  req.movies = movies;
  req.writeToFile = writeToFile;

  try {
    switch (req.method) {
      case 'GET':
        await getReq(req, res);
        break;
      case 'PUT':
        await putReq(req, res);
        break;
      case 'POST':
        await postReq(req, res);
        break;
      case 'DELETE':
        await deleteReq(req, res);
        break;
      default:
        res.statusCode = 404;
        res.end(JSON.stringify({ 
          success: false,
          message: 'Route not found',
          error: `Method ${req.method} not supported`
        }));
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({ 
      success: false,
      message: 'Internal Server Error',
      error: error.message
    }));
  }
};

const server = http.createServer(handleRequest);

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log(`- GET    http://localhost:${PORT}/api/movies`);
  console.log(`- POST   http://localhost:${PORT}/api/movies`);
  console.log(`- PUT    http://localhost:${PORT}/api/movies/:id`);
  console.log(`- DELETE http://localhost:${PORT}/api/movies/:id`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nServer shutting down...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});