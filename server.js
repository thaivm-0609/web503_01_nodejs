import express from "express"; //import express để khởi tạo server node
import mongoose from "mongoose"; //import mongoose để kết nối với mongoDB
import ProductController from "./controllers/ProductController.js";
import AuthController from "./controllers/AuthController.js";

const app = new express();
const port = 3000;
const proController = new ProductController();
const authController = new AuthController();

//cấu hình ejs
app.set('view engine', 'ejs'); //khai báo view engine
app.set('views', './admin'); //khai báo thư mục lưu trữ file giao diện ejs


//cấu hình server
app.use(
    express.urlencoded({
        extended: true,
    })
);

mongoose.connect('mongodb://127.0.0.1:27017/web503_01')
    .then(result => {
        //router: điều hướng ng dùng
        app.get('/list', proController.getList);
        app.get('/create', proController.create); //trả về form thêm mới
        app.post('/save', proController.save); //lưu dữ liệu vào db
        app.get('/edit/:id', proController.edit); //khai báo router cho chức năng edit
        app.post('/update/:id', proController.update);//cập nhật dữ liệu vào db
        app.get('/delete/:id', proController.delete); //xóa bản ghi
        
        //restful API:
        app.get('/products', proController.apiList); //hiển thị danh sách
        app.get('/products/:id', proController.apiDetail); //hiển thị chi tiết
        app.post('/products', proController.apiCreate); //thêm mới
        app.put('/products/:id', proController.apiUpdate); //chỉnh sửa
        app.delete('/products/:id', proController.apiDelete); //xóa

        app.post('/register', authController.register); //hàm đăng ký
        app.post('/login', authController.login); //hàm đăng nhập
        app.listen(port, () => {
            console.log(`Server is running in port ${port}`);
        })
    })

