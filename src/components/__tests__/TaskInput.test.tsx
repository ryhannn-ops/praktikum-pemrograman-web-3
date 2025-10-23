import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import TaskInput from '../TaskInput';

describe('TaskInput', () => {
  const mockSetValue = vi.fn();
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockSetValue.mockClear();
    mockOnSubmit.mockClear();
  });

  it('renders input and button', () => {
    render(
      <TaskInput
        value=""
        setValue={mockSetValue}
        onSubmit={mockOnSubmit}
        existingTasks={[]}
      />
    );

    expect(screen.getByPlaceholderText('Tulis tugas...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tambah' })).toBeInTheDocument();
  });

  it('calls setValue on input change', async () => {
    const user = userEvent.setup();
    render(
      <TaskInput
        value=""
        setValue={mockSetValue}
        onSubmit={mockOnSubmit}
        existingTasks={[]}
      />
    );

    const input = screen.getByPlaceholderText('Tulis tugas...');
    await user.type(input, 'New task');

    expect(mockSetValue).toHaveBeenCalledTimes(8); // 'N', 'e', 'w', ' ', 't', 'a', 's', 'k'
  });

  it('submits on Enter key press', async () => {
    const user = userEvent.setup();
    render(
      <TaskInput
        value="Test task"
        setValue={mockSetValue}
        onSubmit={mockOnSubmit}
        existingTasks={[]}
      />
    );

    const input = screen.getByPlaceholderText('Tulis tugas...');
    await user.type(input, '{enter}');

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('does not submit on Shift+Enter', async () => {
    const user = userEvent.setup();
    render(
      <TaskInput
        value="Test task"
        setValue={mockSetValue}
        onSubmit={mockOnSubmit}
        existingTasks={[]}
      />
    );

    const input = screen.getByPlaceholderText('Tulis tugas...');
    await user.type(input, '{shift}{enter}');

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('shows error for empty task', async () => {
    const user = userEvent.setup();
    render(
      <TaskInput
        value="   "
        setValue={mockSetValue}
        onSubmit={mockOnSubmit}
        existingTasks={[]}
      />
    );

    const button = screen.getByRole('button', { name: 'Tambah' });
    await user.click(button);

    expect(screen.getByText('Task cannot be empty')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('shows error for duplicate task', async () => {
    const user = userEvent.setup();
    render(
      <TaskInput
        value="Existing task"
        setValue={mockSetValue}
        onSubmit={mockOnSubmit}
        existingTasks={['existing task']}
      />
    );

    const button = screen.getByRole('button', { name: 'Tambah' });
    await user.click(button);

    expect(screen.getByText('Task already exists')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('clears error on input change after error', async () => {
    const user = userEvent.setup();
    render(
      <TaskInput
        value=""
        setValue={mockSetValue}
        onSubmit={mockOnSubmit}
        existingTasks={[]}
      />
    );

    const button = screen.getByRole('button', { name: 'Tambah' });
    await user.click(button);

    expect(screen.getByText('Task cannot be empty')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Tulis tugas...');
    await user.type(input, 'a');

    expect(screen.queryByText('Task cannot be empty')).not.toBeInTheDocument();
  });

  it('focuses input on Ctrl+K', () => {
    render(
      <TaskInput
        value=""
        setValue={mockSetValue}
        onSubmit={mockOnSubmit}
        existingTasks={[]}
      />
    );

    const input = screen.getByPlaceholderText('Tulis tugas...');
    fireEvent.keyDown(document, { key: 'k', ctrlKey: true });

    expect(input).toHaveFocus();
  });

  it('focuses input on Cmd+K', () => {
    render(
      <TaskInput
        value=""
        setValue={mockSetValue}
        onSubmit={mockOnSubmit}
        existingTasks={[]}
      />
    );

    const input = screen.getByPlaceholderText('Tulis tugas...');
    fireEvent.keyDown(document, { key: 'k', metaKey: true });

    expect(input).toHaveFocus();
  });
});
