import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "src/users/auth/jwt-auth-guard";
import { PostsService } from "./posts.service";

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  getUserPosts(@Param('id') userId: string) {
    return this.postService.getUserPosts(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('unpublished')
  getUnpublishedPosts() {
    return this.postService.getUnpublishedPosts();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postService.getPost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Body('description') description: string, @Body('userId') userId: string) {
    return this.postService.createPost(description, userId)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updatePost(@Param('id') id: string, @Body('description') description: string) {
    this.postService.updatePost(id, description);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    this.postService.deletePost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('publish/:id')
  publishPost(@Param('id') id: string) {
    this.postService.publishPost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('unpublish/:id')
  unpublishPost(@Param('id') id: string) {
    this.postService.unpublishPost(id);
  }
}
