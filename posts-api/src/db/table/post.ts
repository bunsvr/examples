import createTable from '@db/utils/createTable';

// Constants
export const table = 'Posts';

export const id = 'id';
export const title = 'title';
export const categories = 'categories';
export const content = 'content';

export const $id = `$${id}`;
export const $title = `$${title}`;
export const $categories = `$${categories}`;
export const $content = `$${content}`;

// Table init statement
export const init = createTable(table, {
    [id]: 'int not null',
    [title]: 'text not null',
    [categories]: 'text not null',
    [content]: 'text not null'
}, [id]);
