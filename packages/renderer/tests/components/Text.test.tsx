import React from 'react';
import { render, screen } from '@testing-library/react';

import { Text } from '../../src/components';

describe('Text', () => {
  test('renders Text component', () => {
    render(<Text>test</Text>);
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  test('renders Text as h1', () => {
    const { container } = render(<Text variant="h1">this is h1</Text>);
    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(screen.getByText(/this is h1/i)).toBeInTheDocument();
  });

  test('renders Text as h2', () => {
    const { container } = render(<Text variant="h2">this is h2</Text>);
    expect(container.querySelector('h2')).toBeInTheDocument();
    expect(screen.getByText(/this is h2/i)).toBeInTheDocument();
  });

  test('renders Text as h3', () => {
    const { container } = render(<Text variant="h3">this is h3</Text>);
    expect(container.querySelector('h3')).toBeInTheDocument();
    expect(screen.getByText(/this is h3/i)).toBeInTheDocument();
  });

  test('renders Text as h4', () => {
    const { container } = render(<Text variant="h4">this is h4</Text>);
    expect(container.querySelector('h4')).toBeInTheDocument();
    expect(screen.getByText(/this is h4/i)).toBeInTheDocument();
  });

  test('renders Text as h5', () => {
    const { container } = render(<Text variant="h5">this is h5</Text>);
    expect(container.querySelector('h5')).toBeInTheDocument();
    expect(screen.getByText(/this is h5/i)).toBeInTheDocument();
  });

  test('renders Text as h6', () => {
    const { container } = render(<Text variant="h6">this is h6</Text>);
    expect(container.querySelector('h6')).toBeInTheDocument();
    expect(screen.getByText(/this is h6/i)).toBeInTheDocument();
  });

  test('renders Text as p', () => {
    const { container } = render(<Text variant="p">this is p</Text>);
    expect(container.querySelector('p')).toBeInTheDocument();
    expect(screen.getByText(/this is p/i)).toBeInTheDocument();
  });

  test('renders Text as display1', () => {
    const { container } = render(
      <Text variant="display1">this is display1</Text>
    );
    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(screen.getByText(/this is display1/i)).toBeInTheDocument();
  });

  test('renders Text as display2', () => {
    const { container } = render(
      <Text variant="display2">this is display2</Text>
    );
    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(screen.getByText(/this is display2/i)).toBeInTheDocument();
  });

  test('renders Text as label1', () => {
    const { container } = render(<Text variant="label1">this is label1</Text>);
    expect(container.querySelector('label')).toBeInTheDocument();
    expect(screen.getByText(/this is label1/i)).toBeInTheDocument();
  });

  test('renders Text as label2', () => {
    const { container } = render(<Text variant="label2">this is label2</Text>);
    expect(container.querySelector('label')).toBeInTheDocument();
    expect(screen.getByText(/this is label2/i)).toBeInTheDocument();
  });

  test('renders Text as blockquote', () => {
    const { container } = render(
      <Text variant="blockquote">this is blockquote</Text>
    );
    expect(container.querySelector('blockquote')).toBeInTheDocument();
    expect(screen.getByText(/this is blockquote/i)).toBeInTheDocument();
  });

  test('renders Text as raw', () => {
    const { container } = render(
      <Text variant="raw" html="<span>test</span>" />
    );
    expect(container.querySelector('span')).toBeInTheDocument();
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });
});
