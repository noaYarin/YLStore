const mongoose = require("mongoose"),
  { Schema } = mongoose,
  Joi = require("joi");

const itemSchema = new Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);
itemSchema.methods.validateItem = (item) => {
  const joiItemSchema = Joi.object({
    _id: Joi.options({ allowUnknown: true }),
    image: Joi.string().min(10).required(),
    title: Joi.string().min(2).max(30).required(),
    size: Joi.number().min(2).required(),
    description: Joi.string().min(5).max(150).required(),
    price: Joi.number(1).min(5).required(),
    quantity: Joi.number(0).min(10).required(),
    createdAt: Joi.options({ allowUnknown: true }),
    updatedAt: Joi.options({ allowUnknown: true }),
    __v: Joi.options({ allowUnknown: true }),
  });
  return joiItemSchema.validate(item);
};

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
