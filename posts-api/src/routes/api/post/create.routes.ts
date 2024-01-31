import { createPost } from '@db/queries/post';
import { routes } from '@stricjs/app';
import { jsonv } from '@stricjs/app/parser';
import { status, text } from '@stricjs/app/send';

import getUserFromKey from '@utils/user/getUserFromKey';

import { t, vld } from 'vld-ts';

// Input post detail
const Post = t.obj({
    title: t.str({ minLength: 1 }),
    description: t.str,
    categories: t.list(
        t.str({ minLength: 1, maxLength: 16, exclude: ',' })
    )
});

export default routes('/create')
    // Validate API key and post
    .use(getUserFromKey)

    .state({ post: jsonv(vld(Post)) })
    .reject(() => status('Title, description or categories are missing or invalid!', 403))

    .post('/', ctx => {
        const $id = Date.now().toString();

        // Create post
        createPost.run({
            $id, $author: ctx.state.name,
            $title: ctx.state.title,
        });

        return text($id);
    });
