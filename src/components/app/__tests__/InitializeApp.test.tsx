import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';
import InitializeApp from '../InitializeApp';

describe('InitializeApp', () => {
  it('Removes loading spinner and displays app if initialized', async () => {
    render(
      <InitializeApp>
        <div data-testid="element" />
      </InitializeApp>,
      {
        preloadedState: {
          app: {
            isInitialized: true,
          },
        },
      },
    );
    await waitFor(() =>
      expect(screen.queryByTestId('element')).toBeInTheDocument(),
    );
  });
});
