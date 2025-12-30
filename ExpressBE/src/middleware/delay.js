const delay = (req, res, next) => {
    // nếu không muốn delay chạy qua tất cả các route thì có thể kiểm tra req.path ở đây
    // ví dụ: if (req.path === '/user') { ... }
    setTimeout(() => {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            console.log("Token in delay middleware:", token);
        }
        next();
    }, 3000);
}

module.exports = delay;