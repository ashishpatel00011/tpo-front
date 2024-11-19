import axios from "axios";

// Fetch interview posts from MongoDB using an API
export const getInterviewPosts = async () => {
  try {
    const response = await axios.get("https://tbackent.vercel.app/api/posts");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching interview posts:", error);
    throw new Error("Error fetching interview posts");
  }
};

export const updateInterviewPost = async (id, updatedPost) => {
  try {
    const response = await axios.updatedPost(
      "https://tbackent.vercel.app/api/posts"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching interview posts:", error);
    throw new Error("Error fetching interview posts");
  }
};
