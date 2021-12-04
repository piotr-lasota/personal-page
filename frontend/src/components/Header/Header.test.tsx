/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders correctly', () => {
    const { baseElement } = render(<Header title="Default Starter" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Passes', () => {
    // Arrange
    const value = 3;

    // Act & Assert
    expect(value).toBe(3);
  });

  it('Shows the subtext after the button click', async () => {
    // Arrange
    const title = 'My title';
    render(<Header title={title} />);

    // Act
    fireEvent.click(screen.getByText('Show subtext'));
    await waitFor(() => screen.getByText('This is a subtext'));

    // Assert
    expect(screen.getByText('This is a subtext')).toBeInTheDocument();
  });
});
