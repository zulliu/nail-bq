import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import { useState, useRef } from 'react';

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const countRef = useRef(null);

  const handleStart = () => {
    if (isActive) {
      clearInterval(countRef.current);
    } else {
      countRef.current = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds === 59) {
            setMinutes((minutes) => minutes + 1);
            return 0;
          }
          return seconds + 1;
        });
      }, 1000);
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <Card className='mt-6 w-[320px] mx-auto'>
      <CardBody>
        <Typography variant='h1' className='mb-2'>
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}{' '}
        </Typography>
      </CardBody>
      <CardFooter className='pt-0'>
        <Button onClick={handleStart}>{isActive ? 'Pause' : 'Start'}</Button>
        <Button onClick={handleReset}>Reset</Button>
      </CardFooter>
    </Card>
  );
};
export default Timer;
