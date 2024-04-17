import React from "react";
import { Form, Input, Button, Select, Flex } from "antd";
import CodeMirrorWrapper from "./CodeMirrorWrapper";

const TestForm = (props) => {
  const onFinish = async (values) => {
    const JSONValues = {
      seq: values?.seq,
      category: values?.category,
      stub: values?.stub
        ? JSON.stringify(values.stub.match(/[^\n]*\n|[^\n]+/g))
        : "",
      metadata_stub: values?.metadata_stub
        ? JSON.stringify(JSON.parse(values.metadata_stub))
        : "",
    };
    await props.updateTest(props.data.id, JSONValues);
  };
  return (
    <>
      <Form
        layout="vertical"
        name={`Test-${props.data.id}`}
        onFinish={onFinish}
        style={{ maxWidth: 800, margin: "auto" }}
        initialValues={{
          seq: props.data.seq,
          category: props.data.category,
          stub: props.data.stub
            ? JSON.parse(props.data.stub)?.join("")
            : props.data.stub,
          metadata_stub: props.data.metadata_stub
            ? JSON.stringify(JSON.parse(props.data.metadata_stub), undefined, 4)
            : props.data.metadata_stub,
        }}
        labelAlign="right"
      >
        <Form.Item name="seq" label="Order">
          <Input />
        </Form.Item>
        <Form.Item name="category" label="Category">
          <Select
            placeholder="Select a person"
            optionFilterProp="children"
            options={[
              {
                value: "public",
                label: "Public",
              },
              {
                value: "private",
                label: "Private",
              },
              {
                value: "other",
                label: "Other",
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="stub" label="Stub">
          <CodeMirrorWrapper options={{ mode: "python" }} />
        </Form.Item>
        <Form.Item name="metadata_stub" label="Metadata">
          <CodeMirrorWrapper options={{ mode: "javascript" }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Save Test
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TestForm;
