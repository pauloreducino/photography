// Fotos de demonstração (Unsplash). Troque pelos arquivos do cliente em /public/photos.
export type Category = "Paisagem" | "Retrato" | "Cidade" | "Mar";
export interface Photo { id: string; unsplash: string; title: string; category: Category; w: number; h: number; color: string; }
export const categories: Category[] = ["Paisagem", "Retrato", "Cidade", "Mar"];
export const unsplashUrl = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}&h=${h}`;

const P = (unsplash: string, title: string, category: Category, tall: boolean, color: string): Photo =>
  ({ id: unsplash, unsplash, title, category, w: 1200, h: tall ? 1500 : 800, color });

export const photos: Photo[] = [
  P("1506905925346-21bda4d32df4", "Cume ao amanhecer", "Paisagem", true, "#8fa1b8"),
  P("1494790108377-be9c29b29330", "Luz de janela", "Retrato", true, "#c9a68d"),
  P("1477959858617-67f85cf4f1df", "Avenida às seis", "Cidade", false, "#8a8f9c"),
  P("1507525428034-b723cf961d3e", "Maré baixa", "Mar", false, "#8ec5d6"),
  P("1441974231531-c6227db76b6e", "Trilha na mata", "Paisagem", true, "#4c6b3c"),
  P("1507003211169-0a1dd7228f2d", "Olhar direto", "Retrato", true, "#8d7c6d"),
  P("1514565131-fce0801e5785", "Horizonte de vidro", "Cidade", true, "#6d7a93"),
  P("1518837695005-2083093ee35b", "Onda em movimento", "Mar", true, "#3b7a94"),
  P("1469474968028-56623f02e42e", "Sol entre as árvores", "Paisagem", false, "#b9a36b"),
  P("1438761681033-6461ffad8d80", "Sorriso contido", "Retrato", true, "#b59a86"),
  P("1449824913935-59a10b8d2000", "Rua molhada", "Cidade", false, "#7d8087"),
  P("1501785888041-af3ef285b470", "Lago parado", "Mar", false, "#6f97a8"),
  P("1470071459604-3b5ec3a7fe05", "Neblina nas colinas", "Paisagem", false, "#8b9a8f"),
  P("1500648767791-00dcc994a43e", "Barba e luz lateral", "Retrato", false, "#9a8a78"),
  P("1519681393784-d120267933ba", "Céu de inverno", "Paisagem", true, "#2f3d5c"),
];
