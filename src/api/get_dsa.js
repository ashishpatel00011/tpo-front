import axios from "axios";
export async function getdsa() {
  try {
    const response = await axios.get("https://tbackent.vercel.app/api/dsa");
    return response.data;
  } catch (error) {
    console.error("Error fetching dsa lists:", error);
    throw new Error("Error fetching dsa lists");
  }
}
