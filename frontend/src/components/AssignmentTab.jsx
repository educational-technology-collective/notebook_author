import axios from "axios";
import { Tabs, Modal } from "antd";
const { TabPane } = Tabs;
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";
import { COURSE_ID, ENDPOINT, fetchQuestion, fetchTest } from "../utils/utils";
import AssignmentForm from "./AssignmentForm";

export const AssignmentTab = ({
  assignments,
  activeAssignment,
  setAssignments,
  setActiveAssignment,
  setQuestions,
  setActiveQuestion,
  setTests,
  setActiveTest,
}) => {
  const onChangeAssignment = async (newActiveAssignment) => {
    setActiveAssignment(newActiveAssignment);
    const [questionData, questionId] = await fetchQuestion(newActiveAssignment);
    setQuestions(questionData);
    setActiveQuestion(questionId);
    if (questionId) {
      const [testData, testId] = await fetchTest(questionId);
      setTests(testData);
      setActiveTest(testId);
    } else {
      setTests([]);
    }
  };

  const addAssignment = async () => {
    const newSeq =
      assignments?.length >= 1
        ? assignments[assignments.length - 1].seq + 1
        : 1;
    const body = {
      description: "",
      metadata_description: "",
      stub: "",
      metadata_stub: "",
      seq: newSeq,
      course: COURSE_ID,
    };
    const response = await axios.post(ENDPOINT + "assignment/", body);
    setAssignments((prev) => [...prev, response.data]);
    onChangeAssignment(response.data.id.toString());
  };

  const updateAssignment = async (targetId, data) => {
    const response = await axios.patch(
      `${ENDPOINT}assignment/${targetId}/`,
      data,
    );
    const nextAssignments = assignments.map((a) => {
      if (a.id == targetId) {
        return response.data;
      } else return a;
    });
    setAssignments(nextAssignments);
  };

  const removeAssignment = async (targetId) => {
    const response = await axios.delete(`${ENDPOINT}assignment/${targetId}`);
    setAssignments((prev) =>
      prev.filter(
        (assignment) => assignment.id.toString() !== targetId.toString(),
      ),
    );
    onChangeAssignment(assignments[0].id);
  };

  const showConfirm = async (targetId) => {
    confirm({
      title: "Are you sure to delete this assignment?",
      icon: <ExclamationCircleFilled />,
      async onOk() {
        await removeAssignment(targetId);
      },
    });
  };

  const onEditAssignment = async (targetId, action) => {
    if (action === "add") {
      await addAssignment();
    } else {
      await showConfirm(targetId);
    }
  };

  return (
    <Tabs
      type="editable-card"
      style={{
        width: "30vw",
        padding: "0.5vw",
      }}
      size="small"
      activeKey={activeAssignment}
      onChange={onChangeAssignment}
      onEdit={onEditAssignment}
    >
      {assignments.map((a) => (
        <TabPane
          tab={`Assignment ${a.seq}`}
          key={a.id.toString()}
          closable={true}
        >
          <AssignmentForm data={a} updateAssignment={updateAssignment} />
        </TabPane>
      ))}
    </Tabs>
  );
};
