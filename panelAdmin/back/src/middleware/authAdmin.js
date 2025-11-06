import jwt from "jsonwebtoken";

export const authAdmin = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ msg: "No autorizado" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.rolId !== 1) return res.status(403).json({ msg: "Acceso prohibido" });
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token inválido" });
    }
};
