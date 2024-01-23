import createTable from './utils/createTable';
import type { Database } from 'bun:sqlite';

export const table = 'Posts';

export const id = 'id';
export const title = 'title';
export const categories = 'categories';
export const content = 'content';

export const $id = `$${id}`;
export const $title = `$${title}`;
export const $categories = `$${categories}`;
export const $content = `$${content}`;

export function createPostTable(db: Database) {
    createTable(db, table, {
        [id]: 'int not null',
        [title]: 'text not null',
        [categories]: 'text not null',
        [content]: 'text not null'
    }, [id]);
}
