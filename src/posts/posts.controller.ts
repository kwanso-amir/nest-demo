import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PostResponseInterface } from "src/interfaces";

import { PostsService } from "./posts.service";
import { JwtAuthGuard } from "src/users/auth/jwt-auth-guard";

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  getPosts(): Promise<PostResponseInterface> {
    return this.postService.getPosts();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  getUserPosts(@Param('id') userId: string): Promise<PostResponseInterface> {
    return this.postService.getUserPosts(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('unpublished')
  getUnpublishedPosts(): Promise<PostResponseInterface> {
    return this.postService.getUnpublishedPosts();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getPost(@Param('id') id: string): Promise<PostResponseInterface> {
    return this.postService.getPost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Body('description') description: string, @Body('userId') userId: string): Promise<PostResponseInterface> {
    return this.postService.createPost(description, userId)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updatePost(@Param('id') id: string, @Body('description') description: string): Promise<PostResponseInterface> {
    return this.postService.updatePost(id, description);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletePost(@Param('id') id: string): Promise<PostResponseInterface> {
    return this.postService.deletePost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('publish/:id')
  publishPost(@Param('id') id: string): Promise<PostResponseInterface> {
    return this.postService.publishPost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('unpublish/:id')
  unpublishPost(@Param('id') id: string): Promise<PostResponseInterface> {
    return this.postService.unpublishPost(id);
  }
}
