import { Injectable } from '@nestjs/common';
import { Post } from './dto/post';
import { randomUUID } from 'crypto';

@Injectable()
export class PostService {
  state: Post[] = [];

  async checkExists(title: string): Promise<boolean> {
    const exists = this.state.find((post) => post.title === title);

    return Promise.resolve(!!exists);
  }

  async create(title: string, content: string): Promise<Post> {
    const post = new Post();
    post.id = randomUUID();
    post.title = title;
    post.content = content;

    this.state.push(post);

    return Promise.resolve(post);
  }

  findAll(): Promise<Post[]> {
    return Promise.resolve(this.state);
  }
}
