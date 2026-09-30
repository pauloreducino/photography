# Portfólio de fotografia

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion

    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## Personalizar
- `data/site.ts`: nome, textos, Instagram e WhatsApp.
- `data/photos.ts`: lista de fotos. As atuais são de demonstração (Unsplash); para usar as do cliente, coloque os arquivos em `public/photos` e troque `src` no componente `components/Photo.tsx`.
- Intro da câmera: `components/CameraIntro.tsx` (tempos em ms no `useEffect`) e `components/Camera.tsx` (SVG).

A intro da câmera roda a cada carregamento do site e tem botão "Pular introdução". Com `prefers-reduced-motion` ela fica mais curta, mas não é removida.

## Som
O clique da câmera é sintetizado (`lib/shutter.ts`), sem arquivos. Navegadores bloqueiam áudio antes de um gesto do usuário: o som toca se a pessoa já interagiu com o site ou tocar em "Ativar som" na intro. Para usar um clique real, troque `playShutter` por `new Audio("/sounds/click.mp3").play()`.
# photography
