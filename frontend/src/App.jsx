import { useState, useEffect, useRef } from "react";
import { Flex } from "antd";
import {
  COURSE_ID,
  fetchAssignment,
  fetchQuestion,
  fetchTest,
} from "./utils/utils";
import { AssignmentTab } from "./components/AssignmentTab";
import { QuestionTab } from "./components/QuestionTab";
import { TestTab } from "./components/TestTab";

function App() {
  const [assignments, setAssignments] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [tests, setTests] = useState([]);
  const [activeAssignment, setActiveAssignment] = useState("");
  const [activeQuestion, setActiveQuestion] = useState("");
  const [activeTest, setActiveTest] = useState("");

  const fetchCourse = async (courseId) => {
    const [assignmentData, assignmentId] = await fetchAssignment(courseId);
    setAssignments(assignmentData);
    setActiveAssignment(assignmentId);
    const [questionData, questionId] = await fetchQuestion(assignmentId);
    setQuestions(questionData);
    setActiveQuestion(questionId);
    const [testData, testId] = await fetchTest(questionId);
    setTests(testData);
    setActiveTest(testId);
  };

  useEffect(() => {
    console.log("fetch");
    fetchCourse(COURSE_ID);
  }, []);

  return (
    <>
      <Flex gap="middle" horizontal="true" justify="center">
        <AssignmentTab
          assignments={assignments}
          activeAssignment={activeAssignment}
          setAssignments={setAssignments}
          setActiveAssignment={setActiveAssignment}
          setQuestions={setQuestions}
          setActiveQuestion={setActiveQuestion}
          setTests={setTests}
          setActiveTest={setActiveTest}
        />
        {/* <Flex gap="middle" vertical="true" align="center"> */}
        <QuestionTab
          activeAssignment={activeAssignment}
          questions={questions}
          activeQuestion={activeQuestion}
          setQuestions={setQuestions}
          setActiveQuestion={setActiveQuestion}
          setTests={setTests}
          setActiveTest={setActiveTest}
        />
        <TestTab
          activeQuestion={activeQuestion}
          tests={tests}
          activeTest={activeTest}
          setTests={setTests}
          setActiveTest={setActiveTest}
        />
        {/* </Flex> */}
      </Flex>
    </>
  );
}

export default App;
