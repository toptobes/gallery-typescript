import { AstraDB, Collection } from "@datastax/astra-db-ts";
import { Handler } from "@netlify/functions";

const ASTRA_DB_API_ENDPOINT = process.env["ASTRA_DB_API_ENDPOINT"];
const ASTRA_DB_APPLICATION_TOKEN = process.env["ASTRA_DB_APPLICATION_TOKEN"];

const db = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT);

const handler: Handler = async (event, context) => {
  let returndoc = [];

  let collection = await db.collection("readme_gallery");
  const cursor = collection.find({});

  try {
    const page1Doc = await cursor.toArray();
    page1Doc.forEach((doc) => {
      returndoc.push(doc);
    });
  } catch (e) {
    console.log(e);
  }
  try {
    cursor.next();
    const page2Doc = await cursor.toArray();
    page2Doc.forEach((doc) => {
      returndoc.push(doc);
    });
    cursor.next();
    const page3Doc = await cursor.toArray();
    page3Doc.forEach((doc) => {
      returndoc.push(doc);
    });
  } catch (e) {
    console.log(e);
  }
  try {
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
