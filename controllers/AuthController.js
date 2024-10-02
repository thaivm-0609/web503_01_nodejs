import bcrypt from "bcrypt"; //mã hóa password
import jsonwebtoken from "jsonwebtoken"; //import jwt để tạo token
import User from "../models/User.js";

class AuthController {
    //hàm đăng ký
    async register(req,res) {
        try {
            //B1: lấy dữ liệu ng dùng gửi lên
            const { email,password } = req.body;
            
            //B2: kiểm tra email tồn tại trong hệ thống hay chưa
            const existedEmail = await User.findOne({email});
            if (existedEmail) {
                res.status(400).json({
                    message: "Email đã tồn tại"
                })
            } else {
                //B3: nếu email hợp lệ -> mã hóa password, lưu vào db
                const hashPass = await bcrypt.hash(password,10);
                const newUser = await User.create({
                    email: email,
                    password: hashPass
                });
                if (newUser) {
                    res.status(200).json({
                        message: "Đăng ký thành công",
                        data: newUser
                    })
                }
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: "Something went wrong"
            })
        }

    }

    //hàm đăng nhập
    async login(req,res) {
        try {
            //B1: lấy dữ liệu từ form:
            const { email, password } = req.body;
            //B2: kiểm tra email/password
            const user = await User.findOne({email}); 
            if (!user) {
                res.status(400).json({
                    message: "Email không tồn tại",
                })
            } else {
                //nếu email khớp, check password có khớp vs password trong db không
                const validPassword = await bcrypt.compare(password,user.password);
                if (!validPassword) { //nếu compare sai
                    res.status(400).json({
                        message: "Password không đúng"
                    })
                } else { //nếu compare đúng => tạo token
                    const token = jsonwebtoken.sign(
                        { data: email }, //dữ liệu dùng để tạo token
                        'web503.01', 
                        { expiresIn: 60*60 } //thời gian hết hạn
                    );
                    res.status(200).json({
                        message: "Đăng nhập thành công",
                        data: token
                    })
                }

            }
        } catch (error) {
            res.status(400).json({
                message: "Something went wrong"
            })
        }
    }
}

export default AuthController;