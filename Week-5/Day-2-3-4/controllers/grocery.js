import { validationResult } from "express-validator";

import { Grocery } from "../models/grocery.js";
import cloudinary from "../utils/cloudinary.js";
import { errorHandler, responseHandler } from "../utils/handlers.js";
import { query } from "express";

const getGroceries = async (req, res) => {
  try {
    const data = await Grocery.find({});
    return responseHandler(res, 200, "Data Fetched", data);
  } catch (error) {
    console.log(error);
    return errorHandler(res, 500, error.message);
  }
};

const createGrocery = async (req, res) => {
  const { title, description, price, quantity } = req.body;
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return errorHandler(res, 400, result.array()[0].msg);
    }

    if (!req.file) {
      return errorHandler(res, 400, "Image is required");
    }

    const img = await cloudinary.uploader.upload(req.file.path);

    const grocery = await Grocery.create({
      title,
      description,
      price,
      quantity,
      inStock: quantity > 0 ?? false,
      imageUrl: img.secure_url,
    });

    return responseHandler(res, 201, "Data Added", grocery);
  } catch (error) {
    console.log(error);
    return errorHandler(res, 500, error.message);
  }
};

const getGrocery = async (req, res) => {
  const { id } = req.params;
  try {
    const grocery = await Grocery.findById(id);
    if (!grocery) return errorHandler(res, 404, "Data not found");
    return responseHandler(res, 200, "Data fetched", grocery);
  } catch (error) {
    console.log(error);
    return errorHandler(res, 500, error.message);
  }
};

const updateGrocery = async (req, res) => {
  const { title, description, price, quantity } = req.body;
  const { id } = req.params;
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return errorHandler(res, 400, result.array()[0].msg);
    }

    let grocery = await Grocery.findById(id);

    if (!grocery) return errorHandler(res, 404, "Data not found");
    let img;
    if (req.file) {
      img = await cloudinary.uploader.upload(req.file.path);
    }

    grocery.title = title ?? grocery.title;
    grocery.description = description ?? grocery.description;
    grocery.price = price ?? grocery.price;
    grocery.quantity = quantity ?? grocery.quantity;
    grocery.inStock = quantity > 0 ?? false;
    grocery.imageUrl = req.file ? img.secure_url : grocery.imageUrl;

    await grocery.save();

    return responseHandler(res, 200, "Updated", grocery);
  } catch (error) {
    console.log(error);
    return errorHandler(res, 500, error.message);
  }
};

const deleteGrocery = async (req, res) => {
  const { id } = req.params;
  try {
    const grocery = await Grocery.findByIdAndDelete(id);
    if (!grocery) return errorHandler(res, 404, "Data not found");

    return responseHandler(res, 200, "Data Deleted", grocery);
  } catch (error) {
    console.log(error);
    return errorHandler(res, 500, error.message);
  }
};

export {
  getGroceries,
  createGrocery,
  deleteGrocery,
  getGrocery,
  updateGrocery,
};
