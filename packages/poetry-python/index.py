import json
from os import getenv

import psycopg2
from psycopg2.extensions import (
    cursor,
    connection,
)

POSTGRESQL_URL = getenv("POSTGRESQL_URL")
pg: connection = psycopg2.connect(POSTGRESQL_URL)
pg_cur: cursor = pg.cursor()


def handler(event, context):
    query = "SELECT * FROM users"
    pg_cur.execute(query)
    res = pg_cur.fetchall()
    return {
        "statusCode": 200,
        "body": json.dumps(res, default=str),
    }


if __name__ == "__main__":
    fake_event = {"event": "fake"}
    handler(fake_event, None)
