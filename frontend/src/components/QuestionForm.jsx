import React from "react";
import { Form, Input, Button, Flex } from "antd";

const validateMessages = {
  required: "${label} is required!",
};

const QuestionForm = (props) => {
  const onFinish = async (values) => {
    console.log(values);
    await props.updateQuestion(props.data.id, values);
  };
  return (
    <>
      <Form
        layout="vertical"
        name={props.data.id}
        onFinish={onFinish}
        style={{ maxWidth: 800, margin: "auto" }}
        validateMessages={validateMessages}
        initialValues={{
          seq: props.data.seq,
          description: props.data.description,
          stub: props.data.stub,
          metadata_description: props.data.metadata_description,
          metadata_stub: props.data.metadata_stub,
        }}
        labelAlign="right"
      >
        <Form.Item name="seq" label="Order">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea autoSize={{ minRows: 10 }} />
        </Form.Item>
        <Form.Item name="stub" label="Stub">
          <Input.TextArea autoSize={{ minRows: 10 }} />
        </Form.Item>
        <Flex justify="space-between">
          <Form.Item
            name="metadata_description"
            label="Metadata - Description"
            style={{ width: "45%" }}
          >
            <Input.TextArea autoSize={{ minRows: 5 }} />
          </Form.Item>
          <Form.Item
            name="metadata_stub"
            label="Metadata - Stub"
            style={{ width: "45%" }}
          >
            <Input.TextArea autoSize={{ minRows: 5 }} />
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
