import axios from "axios";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import { ENDPOINT } from "../utils/utils";
import TestForm from "./TestForm";

export const TestTab = ({
  activeQuestion,
  tests,
  activeTest,
  setTests,
  setActiveTest,
}) => {
  const onChangeTest = (newActiveTest) => {
    setActiveTest(newActiveTest);
  };

  const addTest = async () => {
    const newSeq = tests.length >= 1 ? tests[tests.length - 1].seq + 1 : 1;
    const body = {
      stub: "",
      metadata_stub: "",
      seq: newSeq,
      point: 0,
      category: "private",
      question: activeQuestion,
    };
    const response = await axios.post(ENDPOINT + "test/", body);
    setTests((prev) => [...prev, response.data]);
    onChangeTest(response.data.id.toString());
  };

  const updateTest = async (targetId, data) => {
    const response = await axios.patch(`${ENDPOINT}test/${targetId}/`, data);
    const nextTests = tests.map((a) => {
      if (a.id == targetId) {
        return response.data;
      } else return a;
    });
    setTests(nextTests);
  };

  const removeTest = async (targetId) => {
    const response = await axios.delete(`${ENDPOINT}test/${targetId}`);
    setTests((prev) =>
      prev.filter((test) => test.id.toString() !== targetId.toString()),
    );
    onChangeTest(tests[0].id);
  };

  const onEditTest = async (targetId, action) => {
    if (action === "add") {
      await addTest();
    } else {
      await removeTest(targetId);
    }
  };

  return (
    <>
      <Tabs
        type="editable-card"
        style={{ width: "34vw", padding: "0.5vw", paddingLeft: 0 }}
        size="small"
        tabPosition="left"
        activeKey={activeTest}
        onChange={onChangeTest}
        onEdit={onEditTest}
      >
        {tests.map((t) => (
          <TabPane tab={`Test ${t.seq}`} key={t.id.toString()} closable={true}>
            <TestForm data={t} updateTest={updateTest} />
          </TabPane>
        ))}
      </Tabs>
    </>
  );
};
