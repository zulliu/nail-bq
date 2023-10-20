import {
  Card,
  CardBody,
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
    <Card className='mt-2 w-[960px] h-96 flex flex-col'>
      <QuestionControls
        onNext={handleNextRandom}
        fields={activeFields}
        onPrevious={handlePrevious}
      />
      <CardBody>
        <Typography variant='h4' className='px-8'>
          Question
        </Typography>
        <Typography className='px-8 mt-8 text-xl'>
          {questions[currentQuestionIndex]?.question}
        </Typography>
      </CardBody>
      {/* This will push the next content to the bottom */}
      <Accordion className='px-12 mb-12' open={showHint}>
        <AccordionHeader onClick={handleShowHint}>
          Click to Show Hint
        </AccordionHeader>
        {showHint && (
          <AccordionBody>{questions[currentQuestionIndex]?.hint}</AccordionBody>
        )}
      </Accordion>
    </Card>
  );
};
export default Question;
