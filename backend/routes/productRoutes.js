import express from "express";


import {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getProductCount,
    bulkCreateProducts
} from "../controllers/ProductController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/count", getProductCount);
router.get("/:id", getSingleProduct);

// Protected Routes
router.post("/", protect, createProduct);
router.post("/bulk", protect, bulkCreateProducts);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;