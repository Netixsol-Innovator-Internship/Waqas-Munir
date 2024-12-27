import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './schemas/blog.schema';
import mongoose, { Model } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async createBlog(createBlogDto: CreateBlogDto, req) {
    const { category, content, description, thumbnail, title } = createBlogDto;

    const blog = new this.blogModel({
      title,
      category,
      content,
      thumbnail,
      description,
      author: req.user.userId,
    });

    await blog.save();

    return blog;
  }

  async getBlogs(category: string, status: string) {
    const filter: any = {};

    if (category && mongoose.Types.ObjectId.isValid(category)) {
      filter.category = new mongoose.Types.ObjectId(category);
    }

    if (status) {
      filter.status = status;
    }

    const blogs = await this.blogModel
      .find(filter)
      .populate('author', 'name')
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    return blogs;
  }

  async getBlog(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new NotFoundException("Can't find this blog");

    const blog = await this.blogModel
      .findById(new mongoose.Types.ObjectId(id))
      .populate('author', 'name')
      .populate('category', 'name');
    if (!blog) throw new NotFoundException("Can't find this blog");

    return blog;
  }

  async updateBlog(id: string, updateBlogDto: UpdateBlogDto, req) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new NotFoundException("Can't find this blog");

    const blog = await this.blogModel.findById(new mongoose.Types.ObjectId(id));
    if (!blog) throw new NotFoundException("Can't find this blog");

    if (blog.author.toString() !== req.user.userId.toString())
      throw new UnauthorizedException("You can't update this blog");

    if (updateBlogDto.title && blog.title != updateBlogDto.title)
      throw new UnauthorizedException("Can't update the title");

    const { category, content, description, thumbnail } = updateBlogDto;

    const updatedBlog = await this.blogModel.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      { category, content, thumbnail, description },
    );

    return updatedBlog;
  }

  async deleteBlog(id: string, req) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new NotFoundException("Can't find this blog");

    const blog = await this.blogModel.findById(new mongoose.Types.ObjectId(id));
    if (!blog) throw new NotFoundException("Can't find this blog");

    if (blog.author.toString() !== req.user.userId.toString())
      throw new UnauthorizedException("You can't delete this blog");

    const deletedBlog = await this.blogModel.findByIdAndDelete(
      new mongoose.Types.ObjectId(id),
    );
    return deletedBlog;
  }

  async getUserBlogs(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new NotFoundException("Can't find this blog");

    const blogs = await this.blogModel
      .find({
        author: new mongoose.Types.ObjectId(id),
      })
      .populate('author', 'name')
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    return blogs;
  }

  async getAdminBlogs(status: string) {
    const blogs = await this.blogModel
      .find({ status })
      .populate('author', 'name')
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    return blogs;
  }

  async updateStatus(id: string, status: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new NotFoundException("Can't find this blog");

    const blog = await this.blogModel.findById(new mongoose.Types.ObjectId(id));
    if (!blog) throw new NotFoundException("Can't find this blog");

    blog.status = status;
    await blog.save();

    return blog;
  }
}
