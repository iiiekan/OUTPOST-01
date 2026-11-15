// Import all png files in the slide folder numerically
const modules = import.meta.glob('./*.png', { eager: true });

export const SLIDER_FRAMES = Object.keys(modules)
  .sort((a, b) => {
    const numA = parseInt(a.replace(/[^0-9]/g, ''));
    const numB = parseInt(b.replace(/[^0-9]/g, ''));
    return numA - numB;
  })
  .map(key => modules[key].default);