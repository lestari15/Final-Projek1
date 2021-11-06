const jwt = require("jsonwebtoken")

exports.cek = (req) => {
    const token = req.headers['x-access-token'];
    if (token) {
        try {
            var decoded = jwt.verify(token, "rahasia");
            return decoded
        } catch (err) {
            return false;
        }
    } else {
        return false;
    }
}