import query from '@db/utils/query';
import posts from '@db/table/posts';

const createPostQuery = `insert into ${posts} (${posts[':id']}, ${posts[':title']}, ${posts[':author']}) values ($id, $title, $author)` as const;
/** 
 * Create a post
 */
export const createPost = query<void, typeof createPostQuery>(createPostQuery);
