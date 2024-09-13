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
}

export default ProductController;
