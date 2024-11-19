import { useContext, useState } from "react";
import "./write.css";
import { addInterviewPost } from "../../api/add_exp";
import { Context } from "../../context/Context";

const MAX_TITLE_LENGTH = 50;
const MAX_DESC_LENGTH = 5000;

export default function Write() {
  const famousITCompanies = [
    "Accenture",
    "AnglerFox",
    "Byju's",
    "Capgemini",
    "Mahindra EPC",
    "Nwegan",
    "L&T Infotech",
    "Persistent",
    "Amazon",
    "DeltaX",
    "Reliance",
    "Suzlon",
    "Surya",
    "HCL",
    "Cognizant",
    "MicroWeb",
    "IBM",
    "Infosys",
    "Lupin",
    "Microsoft",
    "Mindtree",
    "TATA Projects",
    "Wipro",
    "Global Logic",
    "PhonePe",
    "SAP",
    "TCS",
    "Tech Mahindra",
    "CMC Limited",
    "Patni",
    "ZYCUS",
  ];


  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [companies, setCompanies] = useState("");
  const [questions, setQuestions] = useState("");
  const [tips, setTips] = useState("");
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      alert("Please enter a title.");
      return;
    }
    if (desc.trim() === "") {
      alert("Please enter a description.");
      return;
    }
    if (title.length > MAX_TITLE_LENGTH) {
      alert(`Title must be less than ${MAX_TITLE_LENGTH} characters.`);
      return;
    }
    if (desc.length > MAX_DESC_LENGTH) {
      alert(`Description must be less than ${MAX_DESC_LENGTH} characters.`);
      return;
    }

    const newPost = {
      username: user.username,
      title,
      experience: desc, 
      company: companies, // Use the selected company
      questions, // Include the asked questions
      tips, // Include the preparation tips
      photo: "", // Handle photo upload separately if needed
    };


    // Use the addInterviewPost function to insert the data into Supabase
    try {
      await addInterviewPost(newPost);
      window.location.replace("/home"); // Replace with appropriate navigation after successful post
    } catch (err) {
      console.error("Error adding post to Supabase:", err);
    }
  };
  return (
    <div className="contt">
      <div className="write">
        <h2 className="writeTitle">Write Your Interview Experience</h2>
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            <input
              type="text"
              placeholder="Title"
              className="writeInput"
              autoFocus={true}
              value={title}
              maxLength={MAX_TITLE_LENGTH}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="characterCount">
              {title.length}/{MAX_TITLE_LENGTH}
            </span>
          </div>
          <div>
            <select
              className="companies"
              name="companies"
              value={companies}
              onChange={(e) => setCompanies(e.target.value)}
            >
              <option value="">-- Select Company --</option>
              {famousITCompanies.map((company, index) => (
                <option key={index} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
          <div className="writeFormGroup">
            <textarea
              placeholder="Your interview experience"
              className="writeInput writeText"
              value={desc}
              name="experience"
              maxLength={MAX_DESC_LENGTH}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <span className="characterCount">
              {desc.length}/{MAX_DESC_LENGTH}
            </span>
          </div>
          {/* Input for asked questions */}
          <div className="writeFormGroup">
            <textarea
              placeholder="Asked Questions"
              className="writeInput writeText"
              value={questions}
              name="questions"
              maxLength={MAX_DESC_LENGTH}
              onChange={(e) => setQuestions(e.target.value)}
            ></textarea>
            <span className="characterCount">
              {questions.length}/{MAX_DESC_LENGTH}
            </span>
          </div>
          {/* Input for preparation tips */}
          <div className="writeFormGroup">
            <textarea
              placeholder="Preparation tips"
              className="writeInput writeText"
              value={tips}
              name="tips"
              maxLength={MAX_DESC_LENGTH}
              onChange={(e) => setTips(e.target.value)}
            ></textarea>
            <span className="characterCount">
              {tips.length}/{MAX_DESC_LENGTH}
            </span>
          </div>
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
}
