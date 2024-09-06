const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080, host: '0.0.0.0' });

server.on('connection', (socket) => {
  console.log('Yeni bir bağlantı kuruldu.');

  socket.on('message', (message) => {
    console.log('Mesaj alındı:', message);
    server.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message); // Mesajları JSON formatında gönderdiğinizden emin olun
      }
    });
  });

  socket.on('close', () => {
    console.log('Bağlantı kapandı.');
  });

  socket.on('error', (error) => {
    console.error('WebSocket Hatası:', error);
  });
});

console.log('WebSocket sunucusu 8080 portunda çalışıyor.');
