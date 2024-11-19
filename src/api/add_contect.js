import axios from "axios";

export const addcontect = async (formData) => {
  try {
    const response = await axios.post(
      "https://tbackent.vercel.app/api/contect",
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error("Error submitting the contact form");
  }
};
