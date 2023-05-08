import { Radio } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function AttendQuiz({progressPercentage,renderActiveContent}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const { quizData,active,content } = useSelector(state => state.attendCourse);
  const [selectedAnswer,setSelectedAnswer] = useState(null)
  const [quizStatus,setQuizStatus] = useState(null)
  const {id} = useParams()

    useEffect(()=>{
        fetchQuizDetails()
    },[])

    console.log(quizData,"====quizdata attend quiz===")

 function fetchQuizDetails(){
  console.log(active,"====quiz active====")
  const current_session = active.currentSession;
  const session_id = content[current_session?.index].session_id
  axios.get(`/user/quiz/status/${id}/${session_id}/${quizData?.quiz_id}`)
  .then((res)=>{
    setQuizStatus(res.data.results);
    if(res.data.results.completed){
      setScore(res.data.results.score);
    }
  })
  .catch((err)=>{
    console.log(err)
  })
 }


  const handleAnswer = (isCorrect,index) => {
    console.log(isCorrect,index,"======iscorrect")
    if (isCorrect) {
      setScore(score + 1);
    }
    setSelectedAnswer(index)
    
  };

  const handleNext = ()=>{
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
        setCurrentQuestion(quizData.questions.length+1)
        //saving the data in db
        const current_session = active.currentSession;
        const session_id = content[current_session?.index].session_id
        axios.put('/user/enroll/course-content/status',{courseId:id,contentId:quizData?.quiz_id,contentType:"quiz",sessionId:session_id,payload:score})
        .then((res)=>{
            progressPercentage()
            renderActiveContent()
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  }

  const renderQuiz = () => {
    if (currentQuestion < quizData.questions?.length && !quizStatus?.completed) {
      return (
        <div className='flex flex-col gap-5'>
          <h2 className='text-xl font-semibold'>
            {quizData.questions[currentQuestion].question}
          </h2>
          <ul className='flex flex-col gap-3'>
            {quizData.questions[currentQuestion].options.map((option, index) => (
              <Radio
                type='radio'
                name={`answer${currentQuestion}`}
                color='pink'
                key={index}
                value={option.isCorrect}
                label={option.answer}
                className='radio'
                onChange={() => handleAnswer(option?.isCorrect,index)}
              />
            ))}
          </ul>
          <div className="w-full">
            <button
                className='bg-darkPink w-1/5 text-white font-bold py-2 px-4  disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                disabled={selectedAnswer === null}
                onClick={() => handleNext()}
            >
                Next
            </button>
          </div>
          
        </div>
      );
    } else {
      return (
        <div className='w-full flex flex-col place-items-center place-content-center gap-5'>
        {
            score === 0 ?
            <div className='w-1/5'>
                <img src="/gif/sad-face.gif" alt="sad_face" />
            </div>
            :
            <div className='w-1/5'>
                <img src="/gif/trophy-winner.gif" alt="trophy_winner" />
            </div>
        }
          <h2 className='text-xl text-center font-bold '>Quiz finished!</h2>
          <p className='text-md text-center font-normal'>Final score: {score}</p>
        </div>
      );
    }
  };

  return (
    <div className='w-full p-5 h-auto min-h-96'>
      <div className='w-full flex flex-col gap-5 p-5'>
        <h3 className='text-lg font-semibold border-s-2 border-darkPink px-3'>
          {quizData.title}
        </h3>
        <p className='text-sm font-light'>{quizData.description}</p>
        {
          quizStatus ? 
          <div className='w-full p-5'>{renderQuiz()}</div>
          :
          <div className='w-full p-5 flex flex-col place-items-center place-content-start'>
            <img className='w-1/5'  src="/gif/loading.gif" alt="loading" />
            <h3 className='font-semibold text-sm text-darkPink text-center'>Please wait while we are loading the content for you...</h3>
            </div>
        }
        
      </div>
    </div>
  );
}

export default AttendQuiz;
