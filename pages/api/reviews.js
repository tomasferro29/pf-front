import {mongooseConnect} from "@/lib/mongoose";
import {Review} from "@/models/Review";
const ObjectId = require('mongoose').Types.ObjectId;

export default async function handle(req, res) {
  await mongooseConnect();

  if (req.method === 'POST') {
    const {title,description,stars,product, user} = req.body;
    const review = await Review.findOne({
      $and: [
        {product},
        {'user.email': user.email}
      ]
    });
    if (!review) {
    res.json(await Review.create({title,description,stars,product, user}));
    }
    console.log(review);
    const filter = {_id:new ObjectId(review._id)}
    const update =  {title,description,stars}
    res.json(await Review.updateOne(filter, update));
  }

  if (req.method === 'GET') {
    const {product} = req.query;
    res.json( await Review.find({product}, null, {sort:{createdAt:-1}}) );
  }
}