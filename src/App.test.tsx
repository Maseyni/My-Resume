import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';


test('добавление и удаление задачи', () => {
  render(<App />);
  
  const input = screen.getByPlaceholderText('Новая задача');
  const addButton = screen.getByText('Добавить');

  fireEvent.change(input, { target: { value: 'Тестовая задача' } });
  fireEvent.click(addButton);

  expect(screen.getByText('Тестовая задача')).toBeInTheDocument();

  const deleteButton = screen.getByText('Удалить');
  fireEvent.click(deleteButton);

  expect(screen.queryByText('Тестовая задача')).not.toBeInTheDocument();
});
