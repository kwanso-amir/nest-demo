import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { Post, PostStatus } from "./posts.entity";

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>) { }

  async getPosts() {
    try {
      const posts = this.findPosts(PostStatus.PUBLISHED)

      return {
        status: 200,
        message: '',
        posts,
      }
    } catch (error) {
      throw new NotFoundException('Posts not found!');
    }
  }

  async getPost(id: string) {
    try {
      const post = this.findPostById(id)

      return {
        status: 200,
        message: '',
        post,
      }
    } catch (error) {
      throw new NotFoundException('Post not found!');
    }
  }

  async getUserPosts(userId: string) {
    try {
      const posts = this.findPostByUser(userId)

      return {
        status: 200,
        message: '',
        posts,
      }
    } catch (error) {
      throw new NotFoundException('Posts not found!');
    }
  }

  async getUnpublishedPosts() {
    try {
      const posts = this.findPosts(PostStatus.UNPUBLISHED)

      return {
        status: 200,
        message: '',
        posts,
      }
    } catch (error) {
      throw new NotFoundException('Posts not found!');
    }
  }

  async createPost(description: string, userId: string) {
    try {
      const post = await this.postRepository.save({ description, userId })

      return {
        post,
        status: 201,
        message: "Post create successfully!",
      }
    } catch (error) {
      throw new BadRequestException('Something went wrong!')
    }
  }

  async updatePost(id: string, description: string) {
    try {
      const post = await this.findPostById(id);

      await this.postRepository.save({ ...post, description })

      return {
        status: 200,
        message: 'Post updated successfully!'
      }
    } catch (error) {
      throw new BadRequestException('Something went wrong!')
    }
  }

  async publishPost(id: string) {
    try {
      const post = await this.findPostById(id);
      const { status } = post;

      if (status === PostStatus.PUBLISHED) {
        return {
          status: 200,
          message: 'Post is already published!'
        }
      }

      await this.postRepository.save({ ...post, status: PostStatus.PUBLISHED })

      return {
        status: 200,
        message: 'Post published successfully!'
      }
    } catch (error) {
      throw new BadRequestException('Something went wrong!')
    }
  }

  async unpublishPost(id: string) {
    try {
      const post = await this.findPostById(id);
      const { status } = post

      if (status === PostStatus.UNPUBLISHED) {
        return {
          status: 200,
          message: 'Post is already unpublished!'
        }
      }

      await this.postRepository.save({ ...post, status: PostStatus.UNPUBLISHED })

      return {
        status: 200,
        message: 'Post unpublished successfully!'
      }
    } catch (error) {
      throw new BadRequestException('Something went wrong!')
    }
  }

  async deletePost(id: string) {
    try {
      const post = await this.findPostById(id);
      await this.postRepository.delete(id)

      return {
        status: 200,
        message: 'Post deleted successfully!'
      }
    } catch (error) {
      throw new BadRequestException('Something went wrong!')
    }
  }


  // Helper methods
  async findPostById(id: string) {
    const post = await this.postRepository.findOne(id)

    if (!post) {
      throw new NotFoundException('Post not found!');
    }

    return post;
  }

  async findPostByUser(userId: string) {
    const posts: Post[] = await this.postRepository.find({ where: { userId } })

    if (!posts) {
      throw new NotFoundException('Posts not found!');
    }

    return posts;
  }

  async findPosts(status: PostStatus) {
    try {
      return await this.postRepository.find({ where: { status } })
    } catch (error) {
      throw new NotFoundException('Posts not found!');
    }
  }
}