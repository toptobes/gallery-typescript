import { AstraDB } from '@datastax/astra-db-ts';
import { Handler } from '@netlify/functions';
import { ProjectionOption } from '@datastax/astra-db-ts/dist/collections/options';
import { appInfoProjection, found, shiftBlame } from './prelude.mts';

const { ASTRA_DB_API_ENDPOINT, ASTRA_DB_APPLICATION_TOKEN } = process.env;
const db = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT);

const findOpts = {
  projection: appInfoProjection,
}

export const handler: Handler = async (event) => {
  const tags = event.queryStringParameters?.tag?.split(',')?.filter(Boolean);

  const filter = (tags?.length)
    ? { tags: { $in: tags } }
    : {};

  try {
    const collection = await db.collection('application_gallery');
    const documents = await collection.find(filter, findOpts).toArray();
    return found(documents);
  } catch (e: unknown) {
    return shiftBlame(e);
  }
};
