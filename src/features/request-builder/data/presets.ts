import type { HttpMethod } from '../../../types/http.types';

export interface ApiPreset {
  label: string;
  method: HttpMethod;
  url: string;
  body?: string;
  headers?: Record<string, string>;
}

export const API_PRESETS: ApiPreset[] = [
  {
    label: 'List posts',
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts?_limit=10',
  },
  {
    label: 'Get post',
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
  },
  {
    label: 'Create post',
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/posts',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Hello world', body: 'Post content here', userId: 1 }, null, 2),
  },
  {
    label: 'Update post',
    method: 'PUT',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: 1, title: 'Updated title', body: 'Updated content', userId: 1 }, null, 2),
  },
  {
    label: 'Delete post',
    method: 'DELETE',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
  },
  {
    label: 'List users',
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/users',
  },
  {
    label: 'Get user',
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/users/1',
  },
  {
    label: 'List todos',
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/todos?_limit=10',
  },
];
