import jwt from "jsonwebtoken";
import User from "../models/User.js";

const checkPermission = async (req,res,next) => { //kiểm tra ng dùng có hợp lệ hay ko
    try {
        //lấy token gửi kèm request
        const token = req.headers.authorization?.split(" ")[1];
        //kiểm tra token hợp lệ hay không?
        const data = await jwt.verify(token, 'web503.01');
        if (!data) { //token không hợp lệ
            return res.status(400).json({
                message: "Token không hợp lệ"
            })
        }
        //email trong token có tồn tại trong hệ thống hay không?
        const email = data.data;
        const existedEmail = await User.findOne({email});
        if (!existedEmail) { //nếu email ko tồn tại trong hệ thống
            return res.status(400).json({
                message: "Email không hợp lệ"
            })
        }
        next(); //nếu hợp lệ -> cho thực thi tiếp
    } catch (error) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
}

export { checkPermission }
