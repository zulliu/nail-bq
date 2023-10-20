import {
  List,
  ListItem,
  Checkbox,
  Button,
  ButtonGroup,
} from '@material-tailwind/react';
const QuestionControls = ({ onPrevious, fields, onNext }) => {
  return (
    <div className='flex flex-col w-[30%] ml-2 max-w-[240px]'>
      <ButtonGroup>
        <Button className='w-24 px-2' onClick={onPrevious}>
          Prev
        </Button>
        <Button className='w-24 px-2' onClick={onNext}>
          Next
        </Button>
      </ButtonGroup>
      <List className='flex-col px-0'>
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
