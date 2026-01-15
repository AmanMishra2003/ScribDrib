<<<<<<< HEAD
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
=======
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import animate from "tailwindcss-animate";

>>>>>>> 2991dad (tailwindConfig animation)

export default defineConfig({
<<<<<<< HEAD
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
=======
  plugins: [react(),
       tailwindcss(),
  ],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,"./src")
    }
  }
>>>>>>> 2991dad (tailwindConfig animation)
});
