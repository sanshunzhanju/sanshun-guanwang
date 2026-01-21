const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/cn',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers['content-type']);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Response length:', data.length);
    console.log('First 500 chars:', data.substring(0, 500));
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
});

req.end();
