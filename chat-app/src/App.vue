<template>
  <div id="app">
    <header>
      <h1>Chat Uygulaması</h1>
    </header>
    <main>
      <Chat />
    </main>
  </div>
</template>

<script>
import Chat from './components/Chat.vue';  // Chat bileşenini içe aktarın

export default {
  name: 'App',
  components: {
    Chat
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;

}

header {
  background: #42b983;
  color: white;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

main {
  padding: 20px;
}
</style>
