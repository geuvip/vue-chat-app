<template>
  <div class="chat-container">
    <div class="messages">
      <div 
        v-for="message in messages" 
        :key="message.id" 
        class="message" 
        :class="{ 'own-message': message.username === username }"
      >
        <div class="message-bubble">
          <div class="message-header">
            <strong>{{ message.username }}</strong>
            <span class="message-time">{{ new Date(message.id).toLocaleTimeString() }}</span>
          </div>
          <div class="message-body">{{ message.text }}</div>
        </div>
      </div>
    </div>
    <div class="message-input">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Mesaj yazın..." />
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      socket: null,
      messages: [],
      newMessage: '',
      username: ''
    };
  },
  methods: {
    connect() {
      this.socket = new WebSocket('ws://192.168.1.101:8080'); // Sunucu IP adresinizi girin

      this.socket.onmessage = (event) => {
        if (event.data instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const message = JSON.parse(reader.result);
              // Sunucudan gelen mesajları ekle
              this.messages.push(message);
            } catch (e) {
              console.error('Mesaj JSON olarak ayrıştırılamadı:', reader.result);
            }
          };
          reader.readAsText(event.data);
        }
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket Hatası:', error);
      };
    },
    sendMessage() {
      if (this.newMessage.trim() === '') return;

      const message = {
        id: Date.now(),
        username: this.username,
        text: this.newMessage
      };

      this.socket.send(JSON.stringify(message));
      // Mesajı ekranda hemen göstermek yerine, mesajın WebSocket'ten alınmasını bekleyin
      this.messages.push(message); // Mesajı hemen göstermek için ekliyoruz
      this.newMessage = '';
    }
  },
  mounted() {
    this.username = prompt('Kullanıcı adınızı girin:');
    this.connect();
  }
};

</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 80vh;
  max-width: 600px;
  margin: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff;
}

.messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: #f7f7f8;
}

.message {
  display: flex;
  margin-bottom: 10px;
}

.own-message {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 60%;
  padding: 10px;
  border-radius: 20px;
  position: relative;
}

.own-message .message-bubble {
  background: #0078d4;
  color: #ffffff;
  border-radius: 20px 20px 0 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.message-bubble {
  background: #ffffff;
  color: #333333;
  border-radius: 20px 20px 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.message-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
  color: #666666;
}

.message-body {
  margin-top: 5px;
}

.message-input {
  border-top: 1px solid #ddd;
  padding: 10px;
  background: #ffffff;
}

.message-input input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
