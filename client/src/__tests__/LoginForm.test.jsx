// src/__tests__/LoginForm.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import LoginForm from '../components/LoginForm';

test('renders login form and accepts input', () => {
  render(<LoginForm />);

  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const button = screen.getByRole('button', { name: /login/i });

  fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  expect(emailInput.value).toBe('user@example.com');
  expect(passwordInput.value).toBe('password123');

  fireEvent.click(button);
});
