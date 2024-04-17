import React from "react";
import { Form, Input, Button, Flex } from "antd";
import CodeMirrorWrapper from "./CodeMirrorWrapper";

const QuestionForm = (props) => {
  const onFinish = async (values) => {
    const JSONValues = {
      seq: values?.seq,
      description: values?.description
        ? JSON.stringify(values.description.match(/[^\n]*\n|[^\n]+/g))
        : "",
      metadata_description: values?.metadata_description
        ? JSON.stringify(JSON.parse(values.metadata_description))
        : "",
      stub: values?.stub
        ? JSON.stringify(values.stub.match(/[^\n]*\n|[^\n]+/g))
        : "",
      metadata_stub: values?.metadata_stub
        ? JSON.stringify(JSON.parse(values.metadata_stub))
        : "",
    };
    await props.updateQuestion(props.data.id, JSONValues);
  };
  return (
    <>
      <Form
        layout="vertical"
        name={`Question-${props.data.id}`}
        onFinish={onFinish}
        style={{ maxWidth: 800, margin: "auto" }}
        initialValues={{
          seq: props.data.seq,
          description: props.data.description
            ? JSON.parse(props.data.description)?.join("")
            : props.data.description,
          stub: props.data.stub
            ? JSON.parse(props.data.stub)?.join("")
            : props.data.stub,
          metadata_description: props.data.metadata_description
            ? JSON.stringify(
                JSON.parse(props.data.metadata_description),
                undefined,
                4,
              )
            : props.data.metadata_description,
          metadata_stub: props.data.metadata_stub
            ? JSON.stringify(JSON.parse(props.data.metadata_stub), undefined, 4)
            : props.data.metadata_stub,
        }}
        labelAlign="right"
      >
        <Form.Item name="seq" label="Order">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <CodeMirrorWrapper options={{ mode: "markdown" }} />
        </Form.Item>
        <Form.Item name="stub" label="Stub">
          <CodeMirrorWrapper options={{ mode: "python" }} />
        </Form.Item>

        <Flex justify="space-between">
          <Form.Item
            name="metadata_description"
            label="Metadata - Description"
            style={{ width: "45%" }}
          >
            <CodeMirrorWrapper options={{ mode: "javascript" }} />
          </Form.Item>
          <Form.Item
            name="metadata_stub"
            label="Metadata - Stub"
            style={{ width: "45%" }}
          >
            <CodeMirrorWrapper options={{ mode: "javascript" }} />
          </Form.Item>
        </Flex>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Save Question
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default QuestionForm;
