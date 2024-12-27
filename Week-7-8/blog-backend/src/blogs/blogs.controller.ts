import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogsService } from './blogs.service';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Roles('writer', 'admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createBlog(@Body() createBlogDto: CreateBlogDto, @Request() req) {
    return this.blogsService.createBlog(createBlogDto, req);
  }

  @Get()
  getBlogs(@Query() query: { category?: string; status?: string }) {
    const category = query.category ?? '';
    const status = query.status ?? '';
    return this.blogsService.getBlogs(category, status);
  }

  @Get('user/:id')
  getUserBlogs(@Param() param: { id: string }) {
    return this.blogsService.getUserBlogs(param.id);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  getAdminBlogs(@Query() query: { status: string }) {
    return this.blogsService.getAdminBlogs(query.status);
  }

  @Get(':id')
  getBlog(@Param() param: { id: string }) {
    return this.blogsService.getBlog(param.id);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('status/:id')
  updateStatus(
    @Param() param: { id: string },
    @Body() body: { status: string },
  ) {
    return this.blogsService.updateStatus(param.id, body.status);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateBlog(
    @Param() param: { id: string },
    @Body() updateBlogDto: UpdateBlogDto,
    @Request() req,
  ) {
    return this.blogsService.updateBlog(param.id, updateBlogDto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteBlog(@Param() param: { id: string }, @Request() req) {
    return this.blogsService.deleteBlog(param.id, req);
  }
}
