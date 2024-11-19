import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
 
  return (
    <div className="posts">
      <h1>INTERVIEW EXPERIENCES</h1>
        <Post/>
    </div>
  );
}

