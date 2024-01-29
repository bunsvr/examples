import { createPost } from '@db/queries/post';
import { routes } from '@stricjs/app';
import { jsonv } from '@stricjs/app/parser';
import { status, text } from '@stricjs/app/send';

import getUserFromKey from '@utils/user/getUserFromKey';

import { t, vld } from 'vld-ts';

// Input post detail
const Post = t.obj({
    title: t.str,
    description: t.str,
    categories: t.arr(t.str)
});

export default routes('/create')
    // Validate API key and post
    .use(getUserFromKey)

    .state({ post: jsonv(vld(Post)) })
    .reject(() => status('Title, description and categories are required!', 403))

    .post('/', ctx => {
        const { post, name: $author } = ctx.state,
            $id = Date.now().toString();

        // Create post
        createPost.run({
            $id, $author,
            $contributors: '', $content: '',

            $title: post.title,
            $categories: post.categories.join('|'),
        });

        return text($id);
    });
