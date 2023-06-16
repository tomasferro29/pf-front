import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product";

const handle = async (req,res) => {
  await mongooseConnect();
  const {quantity, productId}= req.body;
  try{
    const product = Product.findById(productId);
    if(product.stock-quantity<0){
        res.status(500).json({message:"The product inventory is inadequate."});
    }else{
    await Product.findByIdAndUpdate(productId, {
        stock: product.stock-quantity
    })
    res.status(200).json({message:"Product inventory updated."});
    }

  }catch(err){
    res.status(500).json({message:'Product not found'});
  }
}

export default handle