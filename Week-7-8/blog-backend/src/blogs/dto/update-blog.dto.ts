import { CreateBlogDto } from './create-blog.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}
