import React from "react";

function QuestionItem({ question, onHandleDeleteItem, onItemChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick () { 
    fetch(`http://localhost:4000/questions/${question.id}`, { 
      method: "DELETE",
    })
    .then(response => response.json())
    .then(()=> onHandleDeleteItem(question))
  }

  function handleItemChange (event) { 
    fetch(`http://localhost:4000/questions/${question.id}`, { 
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({ 
        correctIndex: parseInt(event.target.value),
      }),
    })
    .then(response => response.json())
    .then(updatedAnswer => onItemChange(updatedAnswer))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleItemChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
