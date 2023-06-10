import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

const handle = async (req,res) => {
    await mongooseConnect();

    const {user, product} = req.query;
    const orderPaid = {paid: true};

    try{
        const orders = await Order.find({
            $and: [
                {'line_items': {$elemMatch: {'price_data.product_data.productId': product}}}
            ], orderPaid
        })
        res.status(200).json(orders); 
    } catch(err ){
        res.status(500).json({message: err.message});
    }
}

export default handle;