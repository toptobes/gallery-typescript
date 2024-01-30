import { AstraDB, Collection } from "@datastax/astra-db-ts";
import { Handler } from "@netlify/functions";

const ASTRA_DB_API_ENDPOINT = process.env["ASTRA_DB_API_ENDPOINT"];
const ASTRA_DB_APPLICATION_TOKEN = process.env["ASTRA_DB_APPLICATION_TOKEN"];

const db = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT);

const handler: Handler = async (event, context) => {
  let filter = {};

  if (event.queryStringParameters && event.queryStringParameters.tag) {
    let alltags = event.queryStringParameters.tag.split(",");
    if (alltags.length > 1) {
      filter = { tags: { $all: alltags } };
    }
    let array = [event.queryStringParameters.tag];
    filter = { tags: { $in: alltags } };
  } else {
    filter = {};
  }
  //console.log("FILTER:" + JSON.stringify(filter));

  try {
    let documents = [];
    let collection = await db.collection("application_gallery");
    await collection.find(filter).forEach((doc) => {
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
};

export { handler };
