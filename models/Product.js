import mongoose from "mongoose"; //import thư viện để kết nối vs db

const Schema = mongoose.Schema; //khởi tạo mongo schema

const ProductSchema = new Schema( //khởi tạo ProductSchema, khai báo các trường thông tin trong bảng
    {
        ten: { type: String, required: true }, //khai báo kiểu dữ liệu, có được để trống hay không
        gia: { type: Number },
        mota: { type: String },
        anh: { type: String }
    },
    { timestamps: true } //thêm thời gian tạo/chỉnh sửa bản ghi
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
