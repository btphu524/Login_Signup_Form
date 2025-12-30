require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // nếu không muốn delay chạy qua tất cả các route thì có thể kiểm tra req.path ở đây
    // ví dụ: if (req.path === '/user') { ... }

    const white_lists = ["/", "/login", "/register"];
    if (white_lists.includes(req.path)) {
        next();
    } else {
        if (req?.headers?.authorization?.split(" ")?.[1]) {
            const token = req.headers.authorization.split(" ")[1];

            // verify token
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                console.log("Token in delay middleware:", token);
                console.log("Decoded in delay middleware:", decoded);

                next();
            } catch (error) {
                return res.status(401).json({
                    EC: 401,
                    EM: "Token is invalid"
                });
            }
        } else {
            return res.status(401).json({
                EC: 401,
                EM: "Unauthorized"
            });
        }
    }
}
    
module.exports = auth;