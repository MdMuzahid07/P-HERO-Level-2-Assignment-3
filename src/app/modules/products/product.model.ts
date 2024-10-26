import mongoose from "mongoose";
import { ProductSchema } from "./product.schema";
import { TProduct } from "./product.interface";


const ProductModel = mongoose.model<TProduct>("Product", ProductSchema);

export default ProductModel;