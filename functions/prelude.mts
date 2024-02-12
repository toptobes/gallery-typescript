import { ProjectionOption } from '@datastax/astra-db-ts/dist/collections/options';

export const appInfoProjection: ProjectionOption = {
  'key': 1,
  'name': 1,
  'duration': 1,
  'description': 1,
  'readme': 1,
  'skilllevel': 1,
  'stargazers_count': 1,
  'forks_count': 1,
  'tags': 1,
  'views': 1,
  'likes': 1,
  'urls': 1,
  'last_modified': 1,
};

export const found = (body: unknown) => ({
  body: JSON.stringify(body),
  statusCode: 200,
});

export const shiftBlame = (e: unknown) => ({
  body: JSON.stringify(e),
  statusCode: 400,
});
