export const getImgUrl = (imgPath) => {
  if (!imgPath) return 'https://via.placeholder.com/40'; // placeholder si no hay imagen
  return `http://localhost:3001${imgPath}`; // apunta al backend
};