const Item = require("../models/itemModel");
_ = require("lodash");

const getAllItems = () => {
  return new Promise((resolve, reject) => {
    Item.find()
      .then((items) => resolve(items))
      .catch((err) => reject(err));
  });
};

const insertItem = (itemInfo) => {
  return new Promise((resolve, reject) => {
    const item = new Item(itemInfo);
    let { error } = item.validateItem(item._doc);
    if (!error) {
      item
        .save()
        .then((itemData) => resolve(itemData))
        .catch((err) => reject(err));
    } else {
      reject(error.details[0].message);
    }
  });
};

const getItem = (itemId) => {
  return new Promise((resolve, reject) => {
    Item.findOne({ _id: itemId })
      .then((item) => {
        item ? resolve(item) : reject("No Item Found!");
      })
      .catch((err) => reject(err));
  });
};

const updateItem = (_id, itemData) => {
  return new Promise((resolve, reject) => {
    const item = new Item(itemData);
    let { error } = item.validateItem(itemData);
    if (!error) {
      getItem(_id)
        .then(() => {
          Item.findByIdAndUpdate({ _id }, { $set: itemData })
            .then((item) => {
              return resolve(item);
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    }
  });
};

const deleteItem = (itemId) => {
  return new Promise((resolve, reject) => {
    Item.findOneAndDelete({ _id: itemId })
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

module.exports = {
  getAllItems,
  insertItem,
  getItem,
  updateItem,
  deleteItem,
};
