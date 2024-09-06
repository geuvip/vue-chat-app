import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',  // Bu, Vite sunucusunu tüm ağ arayüzlerine bağlamayı sağlar
    port: 3000,  // İstemci tarafında varsayılan port (isteğe bağlı olarak değiştirebilirsiniz)
    strictPort: true,  // Belirtilen portun kullanılabilir olduğundan emin olur
  },
});
