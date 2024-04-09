import { useState, useEffect, useRef } from "react";
import { Flex, Tabs } from "antd";
import axios from "axios";
const { TabPane } = Tabs;
import AssignmentForm from "./components/AssignmentForm";
import QuestionForm from "./components/QuestionForm";

function App() {
  const [assignments, setAssignments] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [tests, setTests] = useState([]);
  const [activeAssignment, setActiveAssignment] = useState("");
  const [activeQuestion, setActiveQuestion] = useState("");

  const ENDPOINT = import.meta.env.VITE_API_URL;
  const COURSE_ID = "siads505";

  const fetchAssignment = async(courseId) => {
    const assignmentData = await axios.get(
      ENDPOINT + "assignment/?course=" + courseId,
    );
    const assignmentId = activeAssignment ? activeAssignment: assignmentData.data[0].id;
    setAssignments(assignmentData.data);
    setActiveAssignment(assignmentId);
    return assignmentId
  }

  const fetchQuestion = async(assignmentId) => {
    const questionData = await axios.get(
      ENDPOINT + "question/?assignment=" + assignmentId,
    );
    const questionId = activeQuestion ? activeQuestion: questionData.data[0].id;
    setQuestions(questionData.data)
    setActiveQuestion(questionId)
    return questionId
  }

  const fetchData = async (course) => {
   const assignmentId = await fetchAssignment(COURSE_ID)
   const questionId = await fetchQuestion(assignmentId)
  };

  useEffect(() => {
    fetchData(COURSE_ID);
    console.log("fetch")
  }, []);

  const onChangeAssignment = async (newActiveAssignment) => {
    setActiveAssignment(newActiveAssignment);
    console.log(newActiveAssignment)
    setQuestions([])
    await fetchQuestion(newActiveAssignment)
  };

  const addAssignment = async () => {
    const newSeq = assignments[assignments.length - 1].seq + 1;
    const body = {
      description: "New Assignment",
      metadata_description: "",
      stub: "",
      metadata_stub: "",
      seq: newSeq,
      course: COURSE,
    };
    const response = await axios.post(ENDPOINT + "assignment/", body);
    setAssignments((prev) => [...prev, response.data]);
    onChangeAssignment(response.data.id);
  };

  const updateAssignment = async (targetId, data) => {
    console.log(data)
    const response = await axios.patch(`${ENDPOINT}assignment/${targetId}/`, data)
    const nextAssignments = assignments.map(a => {
      if (a.id == targetId) {
        return response.data
      }
      else return a
    })
    setAssignments(nextAssignments)
  }

  const removeAssignment = async (targetId) => {
    const response = await axios.delete(`${ENDPOINT}assignment/${targetId}`);
    setAssignments((prev) =>
      prev.filter(
        (assignment) => assignment.id.toString() !== targetId.toString(),
      ),
    );
    onChangeAssignment(assignments[0].id);
  };

  const onEditAssignment = async (targetId, action) => {
    if (action === "add") {
      await addAssignment();
    } else {
      await removeAssignment(targetId);
    }
  };

  const onChangeQuestion = (newActiveQuestion) => {
    setActiveQuestion(newActiveQuestion);
  };

  const addQuestion = async () => {
    const newSeq = questions[questions.length - 1].seq + 1;
    const body = {
      description: "New Question",
      metadata_description: "",
      stub: "",
      metadata_stub: "",
      seq: newSeq,
      assignment: Number(activeAssignment),
    };
    console.log(body)
    const response = await axios.post(ENDPOINT + "question/", body);
    setQuestions((prev) => [...prev, response.data]);
    onChangeQuestion(response.data.id);
  };

  const updateQuestion = async (targetId, data) => {
    console.log(data)
    const response = await axios.patch(`${ENDPOINT}question/${targetId}/`, data)
    const nextQuestions = questions.map(a => {
      if (a.id == targetId) {
        return response.data
      }
      else return a
    })
    setQuestions(nextQuestions)
  }

  const removeQuestion = async (targetId) => {
    const response = await axios.delete(`${ENDPOINT}question/${targetId}`);
    setQuestions((prev) =>
      prev.filter(
        (question) => question.id.toString() !== targetId.toString(),
      ),
    );
    onChangeQuestion(questions[0].id);
  };

  const onEditQuestion = async (targetId, action) => {
    if (action === "add") {
      await addQuestion();
    } else {
      await removeQuestion(targetId);
    }
  };

  return (
    <>
    <Flex gap="middle" horizontal="true" justify="center">
      <Tabs
        type="editable-card"
        style={{minHeight: "100vh", width: "50vw", padding: 10}}
        centered
        activeKey={activeAssignment}
        onChange={onChangeAssignment}
        onEdit={onEditAssignment}
      >
        {assignments.map((a) => (
          <TabPane tab={`Assignment ${a.seq}`} key={a.id} closable={true}>
            <AssignmentForm data={a} updateAssignment={updateAssignment} />
          </TabPane>
        ))}
      </Tabs>
      <Tabs
        type="editable-card"
        style={{minHeight: "100vh", width: "50vw", padding: 10}}
        centered
        activeKey={activeQuestion}
        onChange={onChangeQuestion}
        onEdit={onEditQuestion}
      >
        {questions.map((q) => (
          <TabPane tab={`Question ${q.seq}`} key={q.id} closable={true}>
            <QuestionForm data={q} updateQuestion={updateQuestion} />
          </TabPane>
        ))}
      </Tabs>
      </Flex>
    </>
    
  );
}

export default App;
