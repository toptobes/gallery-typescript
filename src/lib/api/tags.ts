import { OrderedSet } from 'immutable';

export type Categories = Record<string, Tags>;
export type Tags = OrderedSet<string>;

type CategoriesDTO = {
  _id: string,
  tags: string[],
}[];

const names = {
  languages: 'Languages',
  integrations: 'Integrations',
  frameworks: 'Frameworks',
  apis: 'APIs',
  usecases: 'Use Cases',
  technology: 'Technology',
} as const;

const processCategories = (categories: CategoriesDTO): Categories => categories
  .filter(({ _id }) => _id in names)
  .reduce((acc, { _id, tags }) => ({ ...acc, [names[_id as keyof typeof names]]: OrderedSet(tags) }), {});

export const fetchCategories = () =>
  fetch('/.netlify/functions/getTags')
    .then(res => res.json())
    .then(processCategories);
