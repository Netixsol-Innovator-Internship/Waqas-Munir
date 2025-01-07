import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { Roles } from '../user/roles.decorator';
import { JwtAuthGuard } from '../user/jwt-auth.guard';
import { RolesGuard } from '../user/roles.guard';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto.name);
  }

  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  updateCategory(
    @Param() params: { id: string },
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.updateCategory(
      params.id,
      createCategoryDto.name,
    );
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteCategory(@Param() params: { id: string }) {
    return this.categoryService.deleteCategory(params.id);
  }
}
