import axios from "axios";

export const ENDPOINT = import.meta.env.VITE_API_URL;
export const COURSE_ID = "siads505";

export const fetchAssignment = async (courseId) => {
  const assignmentData = await axios.get(
    ENDPOINT + "assignment/?course=" + courseId,
  );
  const assignmentId = assignmentData.data[0].id.toString();
  return [assignmentData.data, assignmentId];
};

export const fetchQuestion = async (assignmentId) => {
  const questionData = await axios.get(
    ENDPOINT + "question/?assignment=" + assignmentId,
  );
  const questionId =
    questionData.data.length > 0 ? questionData.data[0].id.toString() : "";
  return [questionData.data, questionId];
};

export const fetchTest = async (questionId) => {
  const testData = await axios.get(ENDPOINT + "test/?question=" + questionId);
  const testId = testData.data.length > 0 ? testData.data[0].id.toString() : "";
  return [testData.data, testId];
};
