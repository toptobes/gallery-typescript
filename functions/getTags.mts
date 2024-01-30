import { AstraDB, Collection } from "@datastax/astra-db-ts";
import { Handler } from "@netlify/functions";

const ASTRA_DB_API_ENDPOINT = process.env["ASTRA_DB_API_ENDPOINT"];
const ASTRA_DB_APPLICATION_TOKEN = process.env["ASTRA_DB_APPLICATION_TOKEN"];

const db = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT);

const handler: Handler = async (event, context) => {
  const options = { limit: 20 };

  try {
    let sections = [];
    let collection = await db.collection("tag_gallery");
    await collection.find({}, options).forEach((doc) => {
      sections.push(doc);
    });

    return {
      statusCode: 200,
      body: JSON.stringify(sections),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};

export { handler };
