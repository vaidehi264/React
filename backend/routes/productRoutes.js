import express from "express";


import {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
} from "../controllers/ProductController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

// Protected Routes
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;