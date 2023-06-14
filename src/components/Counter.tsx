'use client';
import { RootState } from '@/store';
import { decrement, increment } from '@/store/counter/slice';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { styled } from 'styled-components';

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <StyledButton onClick={() => dispatch(increment())}>
          {'Increment'}
        </StyledButton>
        <span>{count}</span>
        <Button onClick={() => dispatch(decrement())}>{'Decrement'}</Button>
      </div>
    </div>
  );
};

const StyledButton = styled(Button)`
  color: red;
`;

export default Counter;
