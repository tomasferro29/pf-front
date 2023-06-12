import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const ObjectId = require('mongoose').Types.ObjectId;

const handle = async (req,res) => {
    await mongooseConnect();

    const {user, product} = req.query;
    const orderPaid = {paid: true};
    const productId = new ObjectId(product);

    // console.log (product);
    try{
        const orders = await Order.find({
            $and: [
            {userEmail: user}
            ,{line_items: {$elemMatch: {'price_data.product_data.productId': productId }}}
            , orderPaid]
        })
        res.status(200).json(orders); 
    } catch(err ){
        res.status(500).json({message: err.message});
    }
}

export default handle;