import express, { NextFunction, Request, Response } from "express";
import { ProductController } from "./product.controller";
import requestValidator from "../../middlewares/requestValidator";
import { productValidation } from "./product.validation";
import { multerUpload } from "../../config/multer.config";


const router = express.Router();

router.post(
    "/create-product",
    multerUpload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    requestValidator(productValidation.productValidationSchema),
    ProductController.addProduct
);

router.get(
    "/",
    ProductController.getAllProducts
);

router.get(
    "/:productId",
    ProductController.getASingleProduct
);

router.patch(
    "/:productId",
    multerUpload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        if (req?.body?.data) {
            req.body = JSON.parse(req.body.data);
        }
        next();
    },
    requestValidator(productValidation.updateProductValidationSchema),
    ProductController.updateAProduct
);

router.delete(
    "/:productId",
    ProductController.deleteAProduct
);


export const ProductRoutes = router;