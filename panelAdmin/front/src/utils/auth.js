
export const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (err) {
    console.error("Token inválido:", err);
    return null;
  }
};

export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const decoded = decodeToken(token);
  if (!decoded) return false;

  const now = Date.now() / 1000;
  return decoded.exp > now;
};
