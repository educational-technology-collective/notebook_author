import json
from psycopg2 import connect, sql

# PostgreSQL settings
DB_HOST = 'localhost'
DB_PORT = '5432'
DB_NAME = 'nbauthor'
DB_USER = 'mengyanw'
DB_PASSWORD = 'postgres'

def nb2psql(f):
# Establishing connection to PostgreSQL
    conn = connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT
    )
    cur = conn.cursor()

    chunks = f.read()
    data = json.loads(chunks)
    cells = data["cells"]
    
    cur.execute(sql.SQL("select seq from {} order by seq DESC limit 1").format(sql.Identifier("nbauthor_assignment")))
    a = cur.fetchone()
    a_seq = 0
    if a is not None:
        a_seq = a[0]
    
    if cells[1]['cell_type'] == "markdown":
        print(f"{(len(cells) - 1) // 3} questions in total")
        query = sql.SQL("INSERT INTO {} (description, metadata_description, seq, course) VALUES (%s, %s, %s, %s) RETURNING id").format(sql.Identifier("nbauthor_assignment"))
        cur.execute(query, (
            json.dumps(cells[0]['source']),
            json.dumps(cells[0]['metadata']),
            a_seq+1,
            "siads505"
        ))
    else:
        print(f"{(len(cells) - 2) // 3} questions in total")
        query = sql.SQL("INSERT INTO {} (description, stub, metadata_description, metadata_stub, seq, course) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id").format(sql.Identifier("nbauthor_assignment"))
        cur.execute(query, (
            json.dumps(cells[0]['source']),
            json.dumps(cells[1]['source']),
            json.dumps(cells[0]['metadata']),
            json.dumps(cells[1]['metadata']),
            a_seq + 1,
            "siads505"
        ))
    assignment_id = cur.fetchone()[0]
    
    # Question
    seq = 1
    for i in range(1, len(cells)):
        if cells[i]['cell_type'] == 'markdown':
            query1 = sql.SQL("INSERT INTO {} (assignment_id, description, stub, metadata_description, metadata_stub, seq) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id").format(sql.Identifier("nbauthor_question"))
            cur.execute(query1, (
                assignment_id,
                json.dumps(cells[i]['source']),
                json.dumps(cells[i+1]['source']),
                json.dumps(cells[i]['metadata']),
                json.dumps(cells[i+1]['metadata']),
                seq
            ))
            question_id = cur.fetchone()[0]
            print(f"question{seq} loaded")
            seq += 1

    conn.commit()
    cur.close()
    conn.close()


# # solution
                # query2 = sql.SQL("INSERT INTO {} (question_id, stub, category) VALUES (%s, %s, %s) RETURNING id").format(sql.Identifier("nbauthor_solution"))
                # cur.execute(query2, (
                #     question_id,
                #     json.dumps(cells[i+1]['source']),
                #     'instructor'
                # ))
            
                # test
                # tests = cells[i+2]['source']
                # test_seq = 0
                # # public
                # cur.execute(sql.SQL("INSERT INTO {} (question_id, stub, metadata_stub, point, category, seq) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id").format(sql.Identifier("test")), (
                #     question_id,
                #     json.dumps([tests[:tests.index("### BEGIN HIDDEN TESTS\n")]]),
                #     json.dumps(cells[i+2]['metadata']),
                #     0,
                #     'public',
                #     test_seq
                # ))
                # test_seq += 1
                # # private
                # for j in range(tests.index("### BEGIN HIDDEN TESTS\n") + 1, tests.index("### END HIDDEN TESTS")):
                #     print(test_seq, tests[j])
                #     if tests[j] == "\n":
                #         continue
                #     tests_metadata = ""
                #     point = 0
                #     if j == tests.index("### BEGIN HIDDEN TESTS\n") + 1:
                #         tests_metadata = cells[i+2]['metadata'] 
                #     if j == tests.index("### END HIDDEN TESTS") - 1:
                #         point = 1
                #     cur.execute(sql.SQL("INSERT INTO {} (question_id, stub, metadata_stub, point, category, seq) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id").format(sql.Identifier("test")), (
                #         question_id,
                #         json.dumps([tests[j]]),
                #         json.dumps(tests_metadata),
                #         point,
                #         'private',
                #         test_seq
                #     ))
                #     test_seq += 1
                # cur.execute(sql.SQL("INSERT INTO {} (question_id, stub, metadata_stub, point, category, seq) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id").format(sql.Identifier("nbauthor_test")), (
                #     question_id,
                #     json.dumps(cells[i+2]['source']),
                #     json.dumps(cells[i+2]['metadata']),
                #     0,
                #     '',
                #     1
                # ))
