import { AstraDB } from '@datastax/astra-db-ts';
import { Handler } from '@netlify/functions';
import { appInfoProjection, found, shiftBlame } from './prelude.mts';

const { ASTRA_DB_API_ENDPOINT, ASTRA_DB_APPLICATION_TOKEN } = process.env;
const db = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT);

const findOpts = {
  limit: 20,
};

export const handler: Handler = async () => {
  try {
    const collection = await db.collection('tag_gallery');
    const sections = await collection.find({}, findOpts).toArray();
    return found(sections);
  } catch (e: unknown) {
    return shiftBlame(e);
  }
};
