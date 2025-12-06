import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

// Middleware xác thực token
const protectedRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers?.authorization;
        const token =  authHeader && authHeader.split(' ')[1];

        if(!token) {
            return res.status(401).json({message: 'Không có quyền truy cập' });
        }

        // check valid token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if(err) {
                return res.status(403).json({message: 'Token hết hạn hoặc không hợp lệ'});
            }

            // tim user
            const user = await User.findById(decoded.userId).select('-hashedPassword');
            if(!user){
                return res.status(404).json({message: 'Người dùng không tồn tại'});
            }

            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({message: `${error}`});
    }
}
// Middleware kiểm tra quyền ADMIN
const verifyAdmin = (req, res, next) => {
    if(req.user.role !== 'ADMIN'){
        return res.status(403).json({message: 'Chỉ ADMIN mới có quyền truy cập tài nguyên này'});
    }
    next();
}
// middleware kiểm tra quyền USER
const verifyUser = (req, res, next) => {
    if(req.user.role !== 'USER' && req.user.role !== 'ADMIN'){
        return res.status(403).json({message: 'Không có quyền truy cập tài nguyên này'});
    }
    next();
}
export { protectedRoute, verifyAdmin, verifyUser };