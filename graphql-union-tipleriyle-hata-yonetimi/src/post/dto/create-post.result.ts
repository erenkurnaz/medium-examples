import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { Post } from './post';

@ObjectType()
export class ShortContent {
  @Field(() => String)
  field = 'content';

  @Field(() => String)
  message = 'İçerik en az 10 karakter oluşmalı!';
}

@ObjectType()
export class DuplicatePost {
  @Field(() => String)
  message = 'Post başlığı benzersiz olmalıdı!';

  @Field(() => String, { nullable: true })
  suggestion: string;
}

export const CreatePostResult = createUnionType({
  name: 'CreatePostResult',
  types: () => [Post, ShortContent, DuplicatePost],
  resolveType: (instance) => {
    if (instance instanceof DuplicatePost) return DuplicatePost;
    if (instance instanceof ShortContent) return ShortContent;
    if (instance instanceof Post) return Post;
    return null;
  },
});
