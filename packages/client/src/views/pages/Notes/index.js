import React from 'react';
import { MainAppLayout } from '../../layouts';
import { Box, Text } from '../../components';
import NoteList from './NoteList';
import { useTimer } from '../../../hooks';

const Notes = () => {
  const { time, start, pause, reset, isRunning } = useTimer();

  return (
    <MainAppLayout appMenu={<NoteList />}>
      <Box p={4}>
        <div>
          <button type="button" onClick={start}>
            Start
          </button>
          <button type="button" onClick={pause}>
            Pause
          </button>
          <button type="button" onClick={reset}>
            Reset
          </button>
        </div>
        <Text>
          Elapsed time:
          {time}
        </Text>
        {isRunning && <p>Running...</p>}
        <Text variant="h1">This is the title of a note</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam nam,
          aperiam fugit ea consequuntur unde, iste aliquid expedita aut eligendi
          laboriosam, et obcaecati, distinctio. Mollitia unde, amet voluptatum
          tempore voluptatibus?
        </Text>
        <Text>
          Ipsum dolor sit amet, consectetur adipisicing elit. Impedit commodi
          ex, tenetur necessitatibus quaerat doloremque dicta mollitia,
          consequuntur inventore fugit consequatur dolore temporibus
          praesentium, iusto eligendi nobis repellendus nam. Similique!
        </Text>
        <Text variant="h3">Heading 3 is better</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam nam,
          aperiam fugit ea consequuntur unde, iste aliquid expedita aut eligendi
          laboriosam, et obcaecati, distinctio. Mollitia unde, amet voluptatum
          tempore voluptatibus?
        </Text>
        <Text>
          Ipsum dolor sit amet, consectetur adipisicing elit. Impedit commodi
          ex, tenetur necessitatibus quaerat doloremque dicta mollitia,
          consequuntur inventore fugit consequatur dolore temporibus
          praesentium, iusto eligendi nobis repellendus nam. Similique!
        </Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam nam,
          aperiam fugit ea consequuntur unde, iste aliquid expedita aut eligendi
          laboriosam, et obcaecati, distinctio. Mollitia unde, amet voluptatum
          tempore voluptatibus?
        </Text>
        <Text>
          Ipsum dolor sit amet, consectetur adipisicing elit. Impedit commodi
          ex, tenetur necessitatibus quaerat doloremque dicta mollitia,
          consequuntur inventore fugit consequatur dolore temporibus
          praesentium, iusto eligendi nobis repellendus nam. Similique!
        </Text>
        <Text variant="h3">Heading 3 is better</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam nam,
          aperiam fugit ea consequuntur unde, iste aliquid expedita aut eligendi
          laboriosam, et obcaecati, distinctio. Mollitia unde, amet voluptatum
          tempore voluptatibus?
        </Text>
        <Text>
          Ipsum dolor sit amet, consectetur adipisicing elit. Impedit commodi
          ex, tenetur necessitatibus quaerat doloremque dicta mollitia,
          consequuntur inventore fugit consequatur dolore temporibus
          praesentium, iusto eligendi nobis repellendus nam. Similique!
        </Text>
      </Box>
    </MainAppLayout>
  );
};

export default Notes;
