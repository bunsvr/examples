import db from '@db';
import post from '@db/table/post';

/** 
 * Create a post
 */
export const createPost = db.query<void, {
    [post.$.id]: string,
    [post.$.title]: string,
    [post.$.content]: string,
    [post.$.author]: string,
    [post.$.categories]: string,
    [post.$.contributors]: string
}>(`insert into ${post.table} (${post.keys}) values (${post.vars})`);
