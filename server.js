import express from "express"; //import express để khởi tạo server node
import mongoose from "mongoose"; //import mongoose để kết nối với mongoDB
import ProductController from "./controllers/ProductController.js";

const app = new express();
const port = 3000;
const proController = new ProductController();

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
        app.get('/create', proController.create);
        app.post('/save', proController.save);

        app.listen(port, () => {
            console.log(`Server is running in port ${port}`);
        })
    })

