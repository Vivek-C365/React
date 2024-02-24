import React, { useEffect, useRef, useState } from 'react';
import '../Assets/css/test.css';
import axios from "axios";

function Test() {
    const [MCq, setMcq] = useState([]);
    const [choice, setChoice] = useState([]);
    const [lock , setLock] = useState(false)
    const [score, setScore] = useState(0)
    const checkAns = (e, isCorrect) => {
        if(lock === false){

            if (isCorrect) {
                e.target.classList.add("correct");
                setLock(true)
                setScore(prev=>prev+1)
            } else {
                e.target.classList.add("wrong");
                setLock(true)
            }
        }
    };

    useEffect(() => {
        async function getallquestions() {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/questions/?language=1"
                );
                console.log(response.data);
                setMcq(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getallquestions();
    }, []);

    useEffect(() => {
        async function getallchoice() {
            try {
                const choiceresponse = await axios.get("http://127.0.0.1:8000/api/choice");
                setChoice(choiceresponse.data);
            } catch (error) {
                console.log(error);
            }
        }
        getallchoice();
    }, []);

    
    return (
        <div className="test">
            <h1>Quiz App</h1>
            <hr />
            {MCq.map((MCQ, index) => (
                <div key={index}>
                    <h2>{index + 1}. {MCQ.text}</h2>
                    <ul>
                        {choice.filter(item => item.question === MCQ.id).map((choiceItem, choiceIndex) => (
                                <li key={choiceIndex} onClick={(e) => { checkAns(e, choiceItem.is_correct) }}>
                                    {choiceItem.text}
                                </li>
                            ))}
                    </ul>
                </div>
            ))}
            <button>Next</button>
            <h5>your score {score} out of {MCq.length}</h5>
        </div>
    );
}

export default Test;



// const checkAns = (options, choiceItem, questionId) => {
//     const selectedOption = options.target;
//     const selectedOptionId = choiceItem.id;
  
//     // Deselect all options for the current question
//     const updatedChoice = choice.map(option => {
//       if (option.question === questionId) {
//         if (option.id === selectedOptionId) {
//           return { ...option, selected: true };
//         }
//         return { ...option, selected: false };
//       }
//       return option;
//     });
//     setChoice(updatedChoice);
  
//     // Remove the "selected" class from all options for the current question
//     const optionsList = selectedOption.parentNode.querySelectorAll('li');
//     optionsList.forEach(option => option.classList.remove('selected'));
  
//     // Add the "selected" class to the clicked option
//     selectedOption.classList.add('selected');
  
//     // If the option was correct, update the score
//     const isCorrect = choiceItem.is_correct;
//     if (isCorrect) {
//       setScore(prev => prev + 1);
//     }
//   };
  