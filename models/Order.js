const { model, Schema, models } = require("mongoose");

const OrderSchema = new Schema({
  userEmail: String,
  line_items: Object,
  name: String,
  email: String,
  city: String,
  postalCode: String,
  streetAdress: String,
  country: String,
  paid: Boolean,
},{
  timestamps: true,
});

export const Order = models?.Order || model('Order', OrderSchema);