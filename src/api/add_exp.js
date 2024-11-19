import axios from "axios";

export const addInterviewPost = async (formData) => {
  try {
    const response = await axios.post(
      "https://tbackent.vercel.app/api/posts",
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error("Error submitting the Experience");
  }
};
