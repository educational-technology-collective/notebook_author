import axios from "axios";
import { useEffect } from "react";
import { Tabs, Modal } from "antd";
const { TabPane } = Tabs;
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";
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
      category: "other",
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

  const showConfirm = async (targetId) => {
    confirm({
      title: "Are you sure to delete this test?",
      icon: <ExclamationCircleFilled />,
      async onOk() {
        await removeTest(targetId);
      },
    });
  };

  const onEditTest = async (targetId, action) => {
    if (action === "add") {
      await addTest();
    } else {
      await showConfirm(targetId);
    }
  };

  const categoryColorMap = {
    private: "#ffccc7",
    public: "#d9f7be",
    other: "#fbfbfb",
  };

  useEffect(() => {
    const testTabs = document
      ?.getElementById("test")
      ?.getElementsByClassName("ant-tabs-nav-list")[0]
      ?.getElementsByClassName("ant-tabs-tab");
    for (let i = 0; i < testTabs.length; i++) {
      let targetTest = tests.find(
        (t) => t.id == testTabs.item(i).getAttribute("data-node-key"),
      );
      if (targetTest.metadata_stub) {
        testTabs.item(i).style.backgroundColor = "#ff7875";
      } else {
        testTabs.item(i).style.backgroundColor =
          categoryColorMap[targetTest.category];
      }
    }
  });

  return (
    <>
      <Tabs
        id="test"
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
