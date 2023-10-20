import {
  List,
  ListItem,
  Checkbox,
  Button,
  ButtonGroup,
} from '@material-tailwind/react';
const QuestionControls = ({ onPrevious, fields, onNext }) => {
  return (
    <div className='flex flex-col'>
      <ButtonGroup>
        <Button className='w-36' onClick={onPrevious}>
          Previous
        </Button>
        <Button className='w-36' onClick={onNext}>
          Next
        </Button>
      </ButtonGroup>
      <List className='flex-col'>
        {fields.map((field, index) => (
          <ListItem key={index} className='p-0'>
            <Checkbox defaultChecked onClick={() => toggleField(field)} />
            <label className='text-sm'>{field}</label>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
export default QuestionControls;
