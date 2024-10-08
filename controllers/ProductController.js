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

    async edit(req,res) {
        //lấy dữ liệu cũ của bản ghi
        console.log(req.params, req.query);
        const id = req.params.id; //lấy id của sản phẩm cần sửa
        const oldPro = await Product.findById(id); //lấy data by id
        
        res.render('edit', {oldPro}); //trả ra giao diện edit kèm dữ liệu
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

    async update(req,res) {
        try {
            //lấy dữ liệu mới
            const newData = {
                ten: req.body.ten,
                gia: req.body.gia,
                mota: req.body.mota,
                anh: req.body.anh
            };
            const id = req.params.id; //lấy id cần sửa
            //cập nhật vào db: tham số 1: id; tham số 2: dữ liệu mới
            await Product.findByIdAndUpdate(id,newData); 

            res.redirect('/list');
        } catch (error) {
            console.log(error.message);
        }
    }

    async delete(req,res) {
        try {
            const id = req.params.id; //lấy id bản ghi cần xóa
            await Product.findByIdAndDelete(id); //gọi hàm xóa

            res.redirect('/list'); //điều hướng về trang danh sách
        } catch (error) {
            console.log(error.message);
        }
    }

    //Restful API:
    async apiList(req,res) {
        try {
            const products = await Product.find();
            res.status(200).json({ 
                "message": "Lấy danh sách thành công",
                "data": products 
            })
        } catch (error) {
            res.status(400).json({
                "message": "Something went wrong"
            })
        }
    }

    async apiDetail(req,res) {
        try {
            //lấy id của bản ghi
            const id = req.params.id;
            const product = await Product.findById(id);
            
            res.status(200).json({
                "message": "Lấy dữ liệu thành công",
                "data": product
            })
        } catch (error) {
            res.status(400).json({
                "message": "Something went wrong"
            })
        }
    }

    async apiCreate(req,res) {
        try {
            //B1: lấy dữ liệu ng dùng gửi lên
            const data = {
                ten: req.body.ten,
                gia: req.body.gia,
                mota: req.body.mota,
                anh: req.body.anh,
            };

            //B2: lưu vào trong db
            const newProduct = await Product.create(data);
            res.status(200).json({
                "message": "Thêm mới thành công",
                "data": newProduct
            })
        } catch (error) {
            res.status(400).json({
                "message": "Something went wrong"
            })
        }
    }

    async apiUpdate(req,res) {
        try {
            //B1: lấy id bản ghi cần sửa
            const id = req.params.id;
            //B2: lấy dữ liệu 
            const data = {
                ten: req.body.ten,
                gia: req.body.gia,
                mota: req.body.mota,
                anh: req.body.anh,
            };
            //B3: lưu dữ liệu vào db
            const updatedProduct = await Product.findByIdAndUpdate(id,data);
            res.status(200).json({
                "message": "Cập nhật thành công",
                "data": updatedProduct
            })
        } catch (error) {
            res.status(400).json({
                "message": "Something went wrong"
            })
        }
    }

    async apiDelete(req,res) {
        try {
            //B1: lấy id cần xóa
            const id = req.params.id;
            //B2: xóa
            const deletedPro = await Product.findByIdAndDelete(id);
            res.status(200).json({
                "message": "Xóa thành công",
                "data": deletedPro
            })
        } catch (error) {
            res.status(400).json({
                "message": "Something went wrong"
            })
        }
    }

}

export default ProductController;
