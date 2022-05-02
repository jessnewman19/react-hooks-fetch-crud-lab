import React, { useState, useEffect} from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [triviaQuestions, setTriviaQuestions] = useState([])

  useEffect(() => { 
    fetch("http://localhost:4000/questions")
    .then(response => response.json())
    .then(questions => setTriviaQuestions(questions))
  }, [])

  function handleNewItem (newQuestion) { 
    setTriviaQuestions([...triviaQuestions, newQuestion])
  }

  function handleDeleteItem (deletedQuestion) { 
    const updatedItems = triviaQuestions.filter(question => question.id !== deletedQuestion.id)
    setTriviaQuestions(updatedItems)
  }

  function itemChange (updatedAnswer) { 
    const updatedQuestions = triviaQuestions.map(question => { 
      if (question.id === updatedAnswer.id) { 
        return updatedAnswer
      }
      return question
    })
    setTriviaQuestions(updatedQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onHandleNewItem={handleNewItem}/> : <QuestionList questions={triviaQuestions} onHandleDeleteItem={handleDeleteItem} onItemChange={itemChange}/>}
    </main>
  );
}

export default App;
