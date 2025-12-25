import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
    const product = await Product.create({
        ...req.body,
    });
    res.status(201).json(product);
}

export const getAllProduts = async (req,res) =>{
    try{
        const products = await Product.find()

        res.status(201).json(products);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({message:"Failed to fatch Products"});
    }
}

export const getSingalProduct = async(req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id)
        
        if(!product){
            res.status(404).json({message: "Product not Found !!"});
        }
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message:"failed to fatch products"});
    }
}