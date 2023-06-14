import { PropsWithChildren, ReactElement } from 'react';
import { render, renderHook } from '@testing-library/react';
import { RootState } from '@/store';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import persistedReducer from '@/store/persistedReducer';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

interface RenderOptions {
  preloadedState?: Partial<RootState>;
  initialRoute?: string;
}

const createWrapper = (options?: RenderOptions) => {
  const { preloadedState } = options || {};
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState,
  });

  const Wrapper = ({ children }: PropsWithChildren) => {
    return (
      <MemoryRouterProvider url={options?.initialRoute}>
        <Provider store={store}>{children}</Provider>
      </MemoryRouterProvider>
    );
  };

  return Wrapper;
};

const customRender = (ui: ReactElement, options?: RenderOptions) => {
  const Wrapper = createWrapper(options);

  return render(ui, { wrapper: Wrapper });
};

const customRenderHook = <T,>(hook: () => T, options?: RenderOptions) => {
  const Wrapper = createWrapper(options);

  return renderHook(hook, { wrapper: Wrapper });
};

export * from '@testing-library/react';
export { customRender as render, customRenderHook as renderHook };
