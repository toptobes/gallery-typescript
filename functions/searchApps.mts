import { AstraDB, Collection } from "@datastax/astra-db-ts";
import { Handler } from "@netlify/functions";

const ASTRA_DB_API_ENDPOINT = process.env["ASTRA_DB_API_ENDPOINT"];
const ASTRA_DB_APPLICATION_TOKEN = process.env["ASTRA_DB_APPLICATION_TOKEN"];

const db = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT);

const handler: Handler = async (event, context) => {
  let filter = {};
  let collection = await db.collection("application_gallery");
  let vector = [];
  if (event.queryStringParameters && event.queryStringParameters.similar) {
    let similar = await collection
      .findOne({
        key: event.queryStringParameters.similar,
      })
      .then((doc) => {
        vector = doc["$vector"];
      });
    try {
      let documents = [];
      let collection = await db.collection("application_gallery");
      await collection
        .find({}, { sort: { $vector: vector } })
        .forEach((doc) => {
          documents.push(doc);
        });
      return {
        statusCode: 200,
        body: JSON.stringify(documents),
      };
    } catch (e) {
      return {
        statusCode: 400,
        body: JSON.stringify(e),
      };
    }
  }
};

export { handler };
