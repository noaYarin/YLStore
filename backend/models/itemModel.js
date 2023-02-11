const mongoose = require("mongoose"),
  { Schema } = mongoose,
  Joi = require("joi");

const itemSchema = new Schema(
  {
    image: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    type: { type: String, default: "" },
    size: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);
itemSchema.methods.validateItem = (item) => {
  const joiItemSchema = Joi.object({
    _id: Joi.options({ allowUnknown: true }),
    image: Joi.string().min(10),
    title: Joi.string().min(2).max(30),
    description: Joi.string().min(5).max(150),
    price: Joi.number().integer().min(1),
    createdAt: Joi.options({ allowUnknown: true }),
    updatedAt: Joi.options({ allowUnknown: true }),
    __v: Joi.options({ allowUnknown: true }),
  });
  return joiItemSchema.validate(item);
};

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
