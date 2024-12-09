import { Schema, model, models, Types } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  parentCategory: {
    type: Types.ObjectId,
    ref: "Category",
  },
});

export const Category = models?.Category || model("Category", CategorySchema);
