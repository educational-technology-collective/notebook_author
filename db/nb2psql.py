import json
from psycopg2 import connect, sql

# PostgreSQL settings
DB_HOST = 'localhost'
DB_PORT = '5432'
DB_NAME = 'nbauthor'
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
 
# Loading to db
# Assignment
assignments = ['assignment1.ipynb', 'assignment2.ipynb', 'assignment3.ipynb', 'assignment4.ipynb']
print(f"Loading {len(assignments)} assignment(s) to the database...")

for index, assignment in enumerate(assignments):
    f = open(assignment)
    data = json.load(f)
    f.close()
    cells = data["cells"]
    
    if cells[1]['cell_type'] == "markdown":
        print(f"{assignment}: {(len(cells) - 1) // 3} questions in total")
        query = sql.SQL("INSERT INTO {} (description, metadata_description, seq, course) VALUES (%s, %s, %s, %s) RETURNING id").format(sql.Identifier("nbauthor_assignment"))
        cur.execute(query, (
            json.dumps(cells[0]['source']),
            json.dumps(cells[0]['metadata']),
            index + 1,
            "siads505"
        ))
    else:
        print(f"{assignment}: {(len(cells) - 2) // 3} questions in total")
        query = sql.SQL("INSERT INTO {} (description, stub, metadata_description, metadata_stub, seq, course) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id").format(sql.Identifier("nbauthor_assignment"))
        cur.execute(query, (
            json.dumps(cells[0]['source']),
            json.dumps(cells[1]['source']),
            json.dumps(cells[0]['metadata']),
            json.dumps(cells[1]['metadata']),
            index + 1,
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
                json.dumps(cells[1+1]['metadata']),
                seq
            ))
            question_id = cur.fetchone()[0]
            
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

            
            print(f"question{seq} loaded")
            seq += 1


conn.commit()

cur.close()
conn.close()
