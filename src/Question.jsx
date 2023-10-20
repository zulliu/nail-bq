import {
  Card,
  CardBody,
  CardFooter,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
} from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import QuestionControls from './QuestionControls';
import data from '../public/data.json';

const Question = () => {
  const [open, setOpen] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [activeFields, setActiveFields] = useState([]);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  useEffect(() => {
    setQuestions(data.data);
    const fields = [...new Set(data.data.map((item) => item.field))];
    setActiveFields(fields);
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowHint(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowHint(false);
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
  };

  const handleNextRandom = () => {
    let filteredQuestions = questions.filter((q) =>
      activeFields.includes(q.field)
    );

    if (filteredQuestions.length) {
      const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
      const selectedQuestion = filteredQuestions[randomIndex];
      const indexInOriginalArray = questions.indexOf(selectedQuestion);
      setCurrentQuestionIndex(indexInOriginalArray);
      setShowHint(false); // Reset hint visibility
    } else {
      // handle case when no fields are selected
      console.log('No fields selected');
    }
  };

  const toggleField = (field) => {
    if (activeFields.includes(field)) {
      setActiveFields(activeFields.filter((f) => f !== field));
    } else {
      setActiveFields([...activeFields, field]);
    }
  };

  return (
    <Card className='mt-2 mx-auto w-full max-w-[960px] h-96 flex flex-row'>
      <QuestionControls
        onNext={handleNextRandom}
        fields={activeFields}
        onPrevious={handlePrevious}
      />
      <div className='flex flex-col'>
        <CardBody className='h-40 w-5/6 mx-12 px-2'>
          <Typography variant='h4' className='px-0 flex-wrap'>
            Question
          </Typography>
          <Typography className='px-0 mt-4 text-xl'>
            {questions[currentQuestionIndex]?.question}
          </Typography>
        </CardBody>
        <CardFooter className='h-20 w-5/6 ml-12 px-2'>
          <Accordion className='mt-12' open={showHint}>
            <AccordionHeader onClick={handleShowHint} className='text-md'>
              Click to Show Hint
            </AccordionHeader>
            {showHint && (
              <AccordionBody>
                {questions[currentQuestionIndex]?.hint}
              </AccordionBody>
            )}
          </Accordion>
        </CardFooter>
      </div>
    </Card>
  );
};
export default Question;
