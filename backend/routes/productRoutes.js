import express from "express";
import { createProduct,getAllProduts,getSingalProduct } from "../controllers/ProductController.js";

const router = express.Router();


router.post("/create-product", createProduct);
router.get("/all",getAllProduts);
router.get("/product/:id",getSingalProduct);

export default router;
