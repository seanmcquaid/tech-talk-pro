import { render, screen } from '@testing-library/react';

describe('Example test', () => {
  it('Renders a component', () => {
    render(<div>{'Hello'}</div>);
    expect(screen.queryByText('Hello')).toBeInTheDocument();
  });
});
