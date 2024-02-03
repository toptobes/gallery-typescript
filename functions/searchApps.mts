import { AstraDB } from '@datastax/astra-db-ts';
import { Handler } from '@netlify/functions';
import { appInfoProjection, found, shiftBlame } from './prelude.mts';

const { ASTRA_DB_API_ENDPOINT, ASTRA_DB_APPLICATION_TOKEN } = process.env;
const db = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT);

export const handler: Handler = async (event) => {
  const targetID = event.queryStringParameters?.similar;

  if (!targetID) {
    return shiftBlame({ message: 'Missing similar query parameter' });
  }

  try {
    const collection = await db.collection("application_gallery");

    const target = await collection.findOne({ key: targetID })

    const findOpts = {
      sort: { $vector: target.$vector },
      projection: appInfoProjection,
    };

    const documents = await collection.find({}, findOpts).toArray();

    return found(documents);
  } catch (e: unknown) {
    return shiftBlame(e);
  }
};
