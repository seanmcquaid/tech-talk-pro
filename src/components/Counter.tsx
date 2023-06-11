'use client';
import { RootState } from '@/store';
import { decrement, increment } from '@/store/counter/slice';
import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Counter: FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          {'Increment'}
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          {'Decrement'}
        </button>
      </div>
    </div>
  );
};

export default Counter;
