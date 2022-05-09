import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  CreatePostResult,
  DuplicatePost,
  ShortContent,
} from './dto/create-post.result';
import { Post } from './dto/post';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return await this.postService.findAll();
  }

  @Mutation(() => CreatePostResult)
  async createPost(
    @Args('title') title: string,
    @Args('content') content: string,
  ): Promise<typeof CreatePostResult> {
    if (content.length < 10) return new ShortContent();

    const exists = await this.postService.checkExists(title);
    if (exists) return new DuplicatePost();

    return await this.postService.create(title, content);
  }
}
