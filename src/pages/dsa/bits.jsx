import React, { useState, useEffect, useContext } from 'react';
import { getdsa } from '../../api/get_dsa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import "./all.css";
import { Context } from '../../context/Context';
import { Addproblem, Deleteproblem, getproblemsaved } from '../../api/add_dsa';

const Bits = ({ token }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [problems, setProblems] = useState([]);
  const [checkedProblems, setCheckedProblems] = useState({}); // State to track checked problems
  const { user } = useContext(Context);

  // Count the number of checked problems
  const checkedCount = Object.values(checkedProblems).filter(Boolean).length;

  // Calculate progress percentage
  const progressPercentage = problems.length > 0 ? (checkedCount / problems.length) * 100 : 0;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    async function fetchProblems() {
        try {
            const data = await getdsa(token);
            const filteredProblems = data.filter((problem) => problem.type === "bits");
            setProblems(filteredProblems);

            // Fetch saved problems after problems are set
            if (user && user._id) {
                await fetchSavedProblems(filteredProblems);
            } else {
                console.warn("User is not logged in. Skipping fetching saved problems.");
            }
        } catch (error) {
            console.error("Error fetching problems:", error);
        }
    }

    async function fetchSavedProblems(problems) {
        try {
            const savedProblems = await getproblemsaved(user._id);

            // Filter only the saved problems for the current type
            const filteredSavedProblems = savedProblems.filter((problemId) =>
                problems.some((problem) => problem._id === problemId)
            );

            // Map the filtered saved problem IDs to true for pre-filling checkboxes
            const savedProblemsMap = filteredSavedProblems.reduce((acc, problemId) => {
                acc[problemId] = true;
                return acc;
            }, {});
            setCheckedProblems(savedProblemsMap);
        } catch (error) {
            console.error("Error fetching saved problems:", error);
        }
    }

    // Start fetching problems
    fetchProblems();
}, [token, user]); // Removed problems from dependency array


// Function to handle checkbox click for adding and deleting problems
const handleCheckboxClick = async (userId, problemId) => {
  // Check if the user is logged in
  if (!userId) {
      alert("Please log in to save or remove problems..............");
      return; // Exit the function early if the user is not logged in
  }

  if (checkedProblems[problemId]) {
      try {
          await Deleteproblem(userId, problemId);
          setCheckedProblems((prevState) => ({
              ...prevState,
              [problemId]: false,
          }));
      } catch (error) {
          console.error("Error deleting problem:", error);
      }
  } else {
      try {
          await Addproblem(userId, problemId);
          setCheckedProblems((prevState) => ({
              ...prevState,
              [problemId]: true,
          }));
      } catch (error) {
          console.error("Error adding problem:", error);
      }
  }
};
  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className={`dropbtn ${isOpen ? 'active' : ''}`}>
        <div className="progress-bar-container" style={{ marginTop: '5px', marginBottom: '7px', width: '100%' }}>
          <div
            className="progress-bar"
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: 'red',
              height: '5px',
              borderRadius: '5px',
            }}
          />
        </div>
        <div className="buttoncontent">
          <div className='title'>Bits Manipulation</div>
          <div className='dbtn'>
            {checkedCount}/{problems.length}
            <i className={`fas fa-chevron-down ${isOpen ? 'open' : ''}`} />
          </div>
        </div>

      </button>
      {isOpen && (
        <div className="dropdown-content">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <td></td>
                  <td className="problem"><strong>Problem</strong></td>
                  <td><strong>Leetcode</strong></td>
                  <td><strong>YouTube</strong></td>
                  <td className="difficulty"><strong>Difficulty</strong></td>
                </tr>
              </thead>
              <tbody>
                {problems.length > 0 ? (
                  problems.map((problem) => (
                    <tr key={problem._id}>
                      <td>
                        <input
                          type="checkbox"
                          id={`blind_ques_${problem._id}`}
                          checked={!!checkedProblems[problem._id]} // Pre-fill checkbox if the problem is saved
                          onChange={() => handleCheckboxClick(user?._id, problem._id)} // Add or remove problem from saved list
                        />
                      </td>
                      <td>{problem.name}</td>
                      <td>
                        <a
                          href={problem.leetcode_link}
                          target="_blank"
                          rel="noreferrer noopener"
                          title="Link"
                          className="text-blue-500 hover:underline"
                        >
                          <img src="/logo.png" alt="LeetCode Logo" width="20" height="20" />
                        </a>
                      </td>
                      <td>
                        {problem.youtube_link ? (
                          <a
                            href={problem.youtube_link}
                            target="_blank"
                            rel="noreferrer noopener"
                            title="Link"
                            className="text-red-600 hover:underline"
                          >
                            <FontAwesomeIcon icon={faYoutube} size="lg" />
                          </a>
                        ) : "NA"}
                      </td>
                      <td className={`difficulty ${problem.difficulty}`}>
                        {problem.difficulty}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No problems found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bits;
