import json
from psycopg2 import connect, sql

# PostgreSQL settings
DB_HOST = 'localhost'
DB_PORT = '5432'
DB_NAME = 'assignment'
DB_USER = 'mengyanw'
DB_PASSWORD = 'postgres'

# Establishing connection to PostgreSQL
conn = connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT
)
cur = conn.cursor()


query1 = sql.SQL("select metadata_description, description, metadata_stub, stub, id from {}").format(sql.Identifier("assignment"))
cur.execute(query1)
assignments = cur.fetchall()

print(f"Constructing {len(assignments)} assignment(s) from the database...")

for assignment in assignments:
    cells = []
   
    print(f"assignment{assignment[4]}") 
    # Assignment
    cells.append({
        "cell_type": "markdown",
        "metadata": json.loads(assignment[0]),
        "source": json.loads(assignment[1])
    })
    if assignment[3]:
        cells.append({
            "cell_type": "code",
            "metadata": json.loads(assignment[2]),
            "source": json.loads(assignment[3])
        })
    
    # Add questions
    query2 = sql.SQL(f"select metadata_description, description, metadata_stub, stub, id, seq from question where assignment_id = {assignment[4]} order by seq")
    cur.execute(query2)
    questions = cur.fetchall()
    for question in questions:
        cells.append({
            "cell_type": "markdown",
            "metadata": json.loads(question[0]),
            "source": json.loads(question[1]) 
        })
        cells.append({
            "cell_type": "code",
            "metadata": json.loads(question[2]),
            "source": json.loads(question[3]) 
        })
        query3 = sql.SQL(f"select metadata_stub, stub from test where question_id = {question[4]} and category = 'coursera'")
        cur.execute(query3)
        test = cur.fetchall()[0]
        cells.append({
            "cell_type": "code",
            "metadata": json.loads(test[0]),
            "source": json.loads(test[1]) 
        })
        print(f"question{question[4]} loaded")

    with open(f"assignment-{assignment[4]}.ipynb", "w") as outfile:
        outfile.write(json.dumps({ "cells": cells }))
    
    