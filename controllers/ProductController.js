import Product from "../models/Product.js";

class ProductController {
    //khai báo hàm xử lý
    async getList(req,res) {
        try { 
            //lấy dữ liệu từ database
            const products = await Product.find();
            
            //trả dữ liệu về giao diện
            res.render('list', { products });
        } catch (error) {
            console.log(err.message);
        }
    }

    create(req,res) {
        res.render('create');
    }

    async save(req,res) {
        //req: 3 cách để gửi dữ liệu qua request
        //C1: req.body: form
        //C2: req.query: ?tenQuery1=value1 & tenQuery2=value2 & ...
        //C3: req.params: /products/:id
        try {
            //lấy dữ liệu ng dùng nhập vào form thông qua req.body
            const newProduct = {
                ten: req.body.ten,
                gia: req.body.gia,
                mota: req.body.mota,
                anh: req.body.anh
            };
            await Product.create(newProduct); //đẩy dữ liệu lên lưu vào mongoDB
            
            res.redirect('list'); //điều hướng ng dùng về trang list
        } catch (error) {
            console.log(err.message);
        }
    }
}

export default ProductController;
