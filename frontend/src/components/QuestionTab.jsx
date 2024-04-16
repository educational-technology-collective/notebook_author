import axios from "axios";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import { ENDPOINT, fetchTest } from "../utils/utils";
import QuestionForm from "./QuestionForm";

export const QuestionTab = ({
  activeAssignment,

  questions,
  activeQuestion,
  setQuestions,
  setActiveQuestion,
  setTests,
  setActiveTest,
}) => {
  const onChangeQuestion = async (newActiveQuestion) => {
    setActiveQuestion(newActiveQuestion);
    const [testData, testId] = await fetchTest(newActiveQuestion);
    setTests(testData);
    setActiveTest(testId);
  };

  const addQuestion = async () => {
    const newSeq =
      questions.length >= 1 ? questions[questions.length - 1].seq + 1 : 1;
    const body = {
      description: "",
      metadata_description: "",
      stub: "",
      metadata_stub: "",
      seq: newSeq,
      assignment: activeAssignment,
    };
    const response = await axios.post(ENDPOINT + "question/", body);
    setQuestions((prev) => [...prev, response.data]);
    onChangeQuestion(response.data.id.toString());
  };

  const updateQuestion = async (targetId, data) => {
    const response = await axios.patch(
      `${ENDPOINT}question/${targetId}/`,
      data,
    );
    const nextQuestions = questions.map((a) => {
      if (a.id == targetId) {
        return response.data;
      } else return a;
    });
    setQuestions(nextQuestions);
  };

  const removeQuestion = async (targetId) => {
    const response = await axios.delete(`${ENDPOINT}question/${targetId}`);
    setQuestions((prev) =>
      prev.filter((question) => question.id.toString() !== targetId.toString()),
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
      <Tabs
        type="editable-card"
        style={{
          width: "30vw",
          padding: "0.5vw",
        }}
        size="small"
        activeKey={activeQuestion}
        onChange={onChangeQuestion}
        onEdit={onEditQuestion}
      >
        {questions.map((q) => (
          <TabPane
            tab={`Question ${q.seq}`}
            key={q.id.toString()}
            closable={true}
          >
            <QuestionForm data={q} updateQuestion={updateQuestion} />
          </TabPane>
        ))}
      </Tabs>
    </>
  );
};
