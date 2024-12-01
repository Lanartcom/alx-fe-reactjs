import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

test('renders TodoList component correctly', () => {
  render(<TodoList />);

 
  expect(screen.getByText(/Learn React/i)).toBeInTheDocument();
  expect(screen.getByText(/Learn Jest/i)).toBeInTheDocument();
});

test('adds a new todo when input is provided and button is clicked', () => {
  render(<TodoList />);

  
  const input = screen.getByPlaceholderText(/Add a new todo/i);
  const button = screen.getByText(/Add Todo/i);

 
  fireEvent.change(input, { target: { value: 'Learn Testing' } });
  fireEvent.click(button);

 
  expect(screen.getByText(/Learn Testing/i)).toBeInTheDocument();
});

test('toggles the todo completed state when clicked', () => {
  render(<TodoList />);

  const todoText = screen.getByText(/Learn React/i);
  

  fireEvent.click(todoText);

  
  expect(todoText).toHaveStyle('text-decoration: line-through');
});

test('deletes a todo when delete button is clicked', () => {
  render(<TodoList />);

  const deleteButton = screen.getAllByText(/Delete/i)[0];  
  
  fireEvent.click(deleteButton);

  
  expect(screen.queryByText(/Learn React/i)).not.toBeInTheDocument();
});