import type { Message, UseChatHelpers } from 'ai/react/dist';
import { useChat } from 'ai/react';
import SelectTopicPage from '../page';
import type { MockedFunction } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { render } from '@/utils/testing/reactTestingLibraryUtils';

vi.mock('ai/react');

const mockUseChat = useChat as MockedFunction<typeof useChat>;

describe('SelectTopicPage', () => {
  describe('Load topics buttons', () => {
    it('Displays the reload button if not loading and messages are returned', async () => {
      mockUseChat.mockReturnValue({
        messages: [{ content: 'hello' }] as Message[],
        error: undefined,
        handleSubmit: vi.fn(),
        reload: vi.fn(),
        isLoading: false,
      } as unknown as UseChatHelpers);
      render(<SelectTopicPage />);
      await waitFor(() =>
        expect(
          screen.queryByText('SelectTopicPage.reload'),
        ).toBeInTheDocument(),
      );
    });
    it('Displays the load button if no message are loaded', async () => {
      mockUseChat.mockReturnValue({
        messages: [],
        error: undefined,
        handleSubmit: vi.fn(),
        reload: vi.fn(),
        isLoading: false,
      } as unknown as UseChatHelpers);
      render(<SelectTopicPage />);
      await waitFor(() =>
        expect(screen.queryByText('SelectTopicPage.load')).toBeInTheDocument(),
      );
    });
  });
  describe('List of topics', () => {
    it('Displays a loading spinner when loading', async () => {
      mockUseChat.mockReturnValue({
        messages: [],
        error: undefined,
        handleSubmit: vi.fn(),
        reload: vi.fn(),
        isLoading: true,
      } as unknown as UseChatHelpers);
      render(<SelectTopicPage />);
      await waitFor(() =>
        expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument(),
      );
    });
    it('Displays a list of topics when not loading', async () => {
      mockUseChat.mockReturnValue({
        messages: [],
        error: undefined,
        handleSubmit: vi.fn(),
        reload: vi.fn(),
        isLoading: false,
      } as unknown as UseChatHelpers);
      render(<SelectTopicPage />);
      await waitFor(() =>
        expect(screen.queryByTestId('topics-list')).toBeInTheDocument(),
      );
    });
  });
  it('Displays error message if there is an error', async () => {
    const error = new Error('Test error');
    mockUseChat.mockReturnValue({
      messages: [],
      error: {
        message: error.message,
      },
      handleSubmit: vi.fn(),
      reload: vi.fn(),
      isLoading: false,
    } as unknown as UseChatHelpers);
    render(<SelectTopicPage />);
    await waitFor(() =>
      expect(screen.queryByText(error.message)).toBeInTheDocument(),
    );
  });
});
