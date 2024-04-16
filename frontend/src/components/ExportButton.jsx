import React from "react";
import axios from "axios";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ENDPOINT, COURSE_ID } from "../utils/utils";

export const ExportButton = ({ assignmentId }) => {
  const exportAssignment = async () => {
    const response = await axios.get(
      `${ENDPOINT}file/?assignment=${assignmentId}`,
    );
    const jsonData = response.data;
    const blob = new Blob([jsonData], { type: "application/json" });

    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `assignment-${assignmentId}.ipynb`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Button icon={<DownloadOutlined />} onClick={exportAssignment}>
      Export Assignment
    </Button>
  );
};
