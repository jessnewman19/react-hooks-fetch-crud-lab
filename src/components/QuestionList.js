import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, onHandleDeleteItem, onItemChange}) {

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => (
          <QuestionItem question={question} key={question.id} onHandleDeleteItem={onHandleDeleteItem} onItemChange={onItemChange}/>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
