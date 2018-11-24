import socketIOClient from 'socket.io-client';

const io = socketIOClient('http://127.0.0.1:5000');

io.onConnect = callback => io.on('connect', callback);

export default io;
