import axios from "axios";

// Add problem solved to user
export async function Addproblem(userId, problemId) {
  try {
    const response = await axios.put(
      `https://tbackent.vercel.app/api/users/${userId}/addproblemsolved`,
      { problemId }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding problem to user:", error);
    throw new Error("Error adding problem to user");
  }
}

// Delete problem solved from user
export async function Deleteproblem(userId, problemId) {
  try {
    const response = await axios.delete(
      `https://tbackent.vercel.app/api/users/${userId}/deleteproblemsolved/${problemId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting problem from user:", error);
    throw new Error("Error deleting problem from user");
  }
}

//desplay all saved problems
export async function getproblemsaved(userId) {
  try {
    const response = await axios.get(
      `https://tbackent.vercel.app/api/users/${userId}/problemsaved`
    );
    return response.data.problemsSolved; // Access the nested array
  } catch (error) {
    console.error("Error fetching saved problems:", error);
    throw new Error("Error fetching saved problems");
  }
}
