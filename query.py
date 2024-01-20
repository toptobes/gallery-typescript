from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
import json
import os
from getpass import getpass
import openai
from uuid import uuid4
import sys
from dotenv import load_dotenv
load_dotenv()

ASTRA_DB_SECURE_BUNDLE_PATH = os.environ["ASTRA_DB_SECURE_BUNDLE_PATH"] 
ASTRA_DB_APPLICATION_TOKEN = os.environ["ASTRA_DB_APPLICATION_TOKEN"]
ASTRA_DB_KEYSPACE = "vector"

# Create connection to Astra
cluster = Cluster(
    cloud={
        "secure_connect_bundle": ASTRA_DB_SECURE_BUNDLE_PATH,
    },
    auth_provider=PlainTextAuthProvider(
        "token",
        ASTRA_DB_APPLICATION_TOKEN,
    ),
)
session = cluster.connect()
keyspace = ASTRA_DB_KEYSPACE 

openai.api_key=os.environ["OPENAI_API_KEY"]

embedding_model_name = "text-embedding-ada-002"

# Function for finding the closest quote to a given quote
def find_quote_and_author(query_quote, n):

    # Create the embedding for the query quote
    query_vector = openai.Embedding.create(
        input=[query_quote],
        engine=embedding_model_name,
    ).data[0].embedding
    
    # Create the select statement for the query_quote
    search_statement = f"""SELECT playerline, player FROM vector.shakespeare_cql
            ORDER BY embedding_vector ANN OF %s
            LIMIT %s;
        """
    
    query_values = tuple([query_vector] + [n])
    result_rows = session.execute(search_statement, query_values)

    return [
        (result_row.playerline, result_row.player)
        for result_row in result_rows
    ]

completion_model_name = "gpt-3.5-turbo"

generation_prompt_template = """"
Read the context and summarize it.  Use only this summary to answer the question using {wordcount} words. If you don't know, just say you don't know, don't try to make up an answer.  Be as truthful as possible.

REFERENCE TOPIC: "{topic}"

ACTUAL EXAMPLES:
{examples}
"""

def generate_quote(topic, n=100, author=None, tags=None):
    # Override the number of documents
    if len(sys.argv) > 3:
        n=int(sys.argv[3])
    quotes = find_quote_and_author(query_quote=topic, n=n)
    if quotes:
        prompt = generation_prompt_template.format(
            topic=topic,
            wordcount=sys.argv[1],
            examples="\n".join(f"  - {quote[0]}" for quote in quotes),
        )
        print(prompt)
        # a little logging:
        print("** quotes found:")
        for q, a in quotes:
            print(f"{q} ({a})")
        print("** end of logging")

        system_prompt = "You will be provided with several documents. Create a summary of the documents to answer the question. Your task is to answer the question using only the summary. If the document does not contain the information needed to answer this question then simply write: Insufficient information. "

        # Generate the answer using the prompt
        response = openai.ChatCompletion.create(
            model=completion_model_name,
            messages=[{"role": "user", "content": prompt},
                      {"role": "system", "content":system_prompt}],
            temperature=0.7,
            max_tokens=320,
        )
        return response.choices[0].message.content.replace('"', '').strip()
    else:
        print("** no quotes found.")
        return None

q_topic = generate_quote(sys.argv[2])
print("\nAn answer to the question:")
print(q_topic)