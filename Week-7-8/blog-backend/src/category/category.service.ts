import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async createCategory(name: string) {
    try {
      const category = new this.categoryModel({ name });
      await category.save();
      return category;
    } catch (error) {
      if (error.code == 11000)
        throw new BadRequestException('Category already exists');
    }
  }

  async getCategories() {
    const categories = await this.categoryModel.find();
    return categories;
  }

  async updateCategory(id: string, name: string) {
    const category = await this.categoryModel.findById(
      new mongoose.Types.ObjectId(id),
    );
    if (!category) throw new NotFoundException("Category doesn't exists");

    category.name = name;
    await category.save();

    return category;
  }

  async deleteCategory(id: string) {
    const category = await this.categoryModel.findByIdAndDelete(
      new mongoose.Types.ObjectId(id),
    );
    if (!category) throw new NotFoundException("Category doesn't exists");
    return category;
  }
}
