import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { ENDPOINT, COURSE_ID } from "../utils/utils";

export const ImportButton = ({ fetchCourse }) => {
  const props = {
    name: "file",
    action: `${ENDPOINT}file/`,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        fetchCourse(COURSE_ID);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Upload {...props} accept=".ipynb, .json">
      <Button icon={<UploadOutlined />}>Import Assignment</Button>
    </Upload>
  );
};
