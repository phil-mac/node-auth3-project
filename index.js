const server = require('./server')

const PORT = process.env.PORT || 5454;

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})