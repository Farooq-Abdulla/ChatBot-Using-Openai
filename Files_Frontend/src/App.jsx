import { useState } from "react";
import axios from "axios";

function App() {
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState("");

  async function pressedEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
      const response = await axios.post(
        "http://localhost:3000/",
        {
          user: userInput,
          assistant:
            conversation.length > 0
              ? conversation[conversation.length - 1].assistant
              : "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const newConversation = [
        ...conversation,
        { user: userInput, assistant: response.data.data.content },
      ];
      setConversation(newConversation);
      setUserInput(""); // Reset user input
    }
  }

  return (
    <>
      <div>
        {conversation.map((item, index) => (
          <div key={index}>
            {item.user && <p>User: {item.user}</p>}
            {item.assistant && <p>Assistant: {item.assistant}</p>}
          </div>
        ))}
        <div>
          User:{" "}
          <input
            type="text"
            name="user"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyUp={(e) => pressedEnter(e)}
          />
        </div>
      </div>
    </>
  );
}

export default App;
