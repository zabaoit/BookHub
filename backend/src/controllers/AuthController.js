import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from '../models/UserModel.js'

const ACCESS_TOKEN_TTL = "30day";
const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60 * 1000; // 7 ngày tính bằng milliseconds

const authRegister = async (req, res) => {
    try {
        const {username, email, password} = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({message: 'Vui lòng điền đầy đủ thông tin'});
    }

    // check email đã tồn tại

    const user = await User.findOne({email});
    if(user) {
        return res.status(400).json({message: 'Email đã đăng ký!'});
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    // Tạo user mới
    await User.create({
        username,
        hashedPassword,
        email,
        role: 'USER',
    })

    return  res.status(201).json({message: 'Đăng ký thành công!'});

    } catch (error) {
        return res.status(500).json({message: `${error}`});
    }
}

const authlogin = async (req, res) => {
    try {
       const {email, password} = req.body;

       if(!email || !password) {
        return res.status(400).json({message: 'Vui lòng điền đầy đủ thông tin'});
    }

    // check email tồn tại
    const user = await User.findOne({email});
    if(!user) {
        return res.status(401).json({ message: "username hoặc password không chính xác!" });
    }
    
    // check password 
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if(!isPasswordValid){
        return res.status(401).json({ message: "username hoặc password không chính xác!" });
    
    }

    // create accesstoken
    const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_TTL});

    // create refreshtoken
    const refreshToken  = crypto.randomBytes(64).toString('hex');

    user.refreshToken = refreshToken;
    await user.save();

    // set cookie (chỉ secure khi production)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
      maxAge: REFRESH_TOKEN_TTL,
    });

    // return access token
    return res.status(200).json({ message: "Đăng nhập thành công!", accessToken, user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    }});



    } catch (error) {
        return res.status(500).json({message: `${error}`});
    }
}

const authLogOut = async (req, res) => {
    try {
        const {refreshToken} = req.cookies;
        if(!refreshToken) {
            return res.status(400).json({message: "Đã có lỗi xảy ra!"});
        }

        // tim user co refresh token set về null
        const user = await User.findOne({refreshToken});
        if(user){
            user.refreshToken = null;
            await user.save();
        }
        // xóa cookie
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
        });

        return res.status(200).json({message: "Đăng xuất thành công!"});
    } catch (error) {
        return res.status(500).json({message: `${error}`});
    }
}

const authRefreshToken = async (req, res)  => {
    try {
        const {refreshToken} = req.cookies;
        if(!refreshToken) {
            return res.status(400).json({message: "Đã có lỗi xảy ra!"});
        }
        // tim user co refresh token
        const user = await User.findOne({refreshToken});
        if(!user) {
            return res.status(403).json({message: "Không có quyền truy cập!"});
        }

        // tạo access token mới
        const newAccessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_TTL});

        return res.status(200).json({accessToken: newAccessToken});
    } catch (error) {
        return res.status(500).json({message: `${error}`});
    }
}
export { authRegister, authlogin, authLogOut, authRefreshToken };