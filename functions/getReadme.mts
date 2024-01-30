import { AstraDB, Collection } from "@datastax/astra-db-ts";
import { Handler } from "@netlify/functions";

const ASTRA_DB_API_ENDPOINT = process.env["ASTRA_DB_API_ENDPOINT"];
const ASTRA_DB_APPLICATION_TOKEN = process.env["ASTRA_DB_APPLICATION_TOKEN"];

const db = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT);

const handler: Handler = async (event, context) => {
  let returndoc = [];

  let collection = await db.collection("readme_gallery");
  let slug = event.queryStringParameters.slug;

  try {
    await collection.findOne({ _id: slug }).then((doc) => {
      returndoc.push(doc);
    });

    return {
      statusCode: 200,
      body: JSON.stringify(returndoc),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};

export { handler };
