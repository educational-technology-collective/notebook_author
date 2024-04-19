import json
from psycopg2 import connect, sql
import os
from dotenv import load_dotenv
load_dotenv()

def psql2nb(id):
    # Establishing connection to PostgreSQL
    conn = connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=int(os.getenv("DB_PORT"))
    )
    cur = conn.cursor()

    query1 = sql.SQL(f"select metadata_description, description, metadata_stub, stub, id from nbauthor_assignment where id = {id}")
    cur.execute(query1)
    assignment = cur.fetchone()

    if assignment is not None:
        cells = []
    
        print(f"assignment{assignment[4]}") 
        # Assignment
        cells.append({
            "cell_type": "markdown",
            "metadata": json.loads(assignment[0] or 'null') or {},
            "source": json.loads(assignment[1] or 'null') or []
        })
        if assignment[3]:
            cells.append({
                "cell_type": "code",
                "metadata": json.loads(assignment[2] or 'null') or {},
                "outputs": [],
                "source": json.loads(assignment[3] or 'null') or [],
            })
        
        # Add questions
        query2 = sql.SQL(f"select metadata_description, description, metadata_stub, stub, id, seq from nbauthor_question where assignment_id = {assignment[4]} order by seq")
        cur.execute(query2)
        questions = cur.fetchall()
        for question in questions:
            cells.append({
                "cell_type": "markdown",
                "metadata": json.loads(question[0] or 'null') or {},
                "source": json.loads(question[1] or 'null') or []
            })
            cells.append({
                "cell_type": "code",
                "metadata": json.loads(question[2] or 'null') or {},
                "outputs": [],
                "source": json.loads(question[3] or 'null') or []
            })
            query3 = sql.SQL(f"select metadata_stub, stub, category from nbauthor_test where question_id = {question[4]} and category <> 'other'")
            cur.execute(query3)
            tests = cur.fetchall()
            if tests is not None:
                for test in tests:
                    source = json.loads(test[1] or 'null') or []
                    if test[2] == 'private':
                        source = ["### BEGIN HIDDEN TESTS\n"] + source + ["\n### END HIDDEN TESTS"]
                    cells.append({
                        "cell_type": "code",
                        "metadata": json.loads(test[0] or 'null') or {},
                        "source": source
                    })
            print(f"question{question[4]} loaded")

        raw = {
                "cells": cells,
                "metadata": {
                    "anaconda-cloud": {},
                    "kernelspec": {
                    "display_name": "Python 3 (ipykernel)",
                    "language": "python",
                    "name": "python3"
                    },
                    "language_info": {
                    "codemirror_mode": {
                        "name": "ipython",
                        "version": 3
                    },
                    "file_extension": ".py",
                    "mimetype": "text/x-python",
                    "name": "python",
                    "nbconvert_exporter": "python",
                    "pygments_lexer": "ipython3",
                    "version": "3.10.13"
                    }
                },
                "nbformat": 4,
                "nbformat_minor": 4
        }
        # with open(f"assignment-{assignment[4]}.ipynb", "w") as outfile:
        #     outfile.write(json.dumps(raw, indent=1))
        return json.dumps(raw, indent=1)
    
    