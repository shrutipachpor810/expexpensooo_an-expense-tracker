import { useState, useEffect } from 'react';
import './ExpenseForm.css';

const ExpenseForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [amount, setAmount] = useState(initialData.amount || '');
  const [category, setCategory] = useState(initialData.category || '');
  const [date, setDate] = useState(initialData.date || '');

  useEffect(() => {
    setTitle(initialData.title || '');
    setAmount(initialData.amount || '');
    setCategory(initialData.category || '');
    setDate(initialData.date || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category || !date) return alert('All fields are required');
    onSubmit({ title, amount, category, date });
    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          placeholder="e.g. Grocery"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Amount</label>
        <input
          type="number"
          placeholder="e.g. 250"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          placeholder="e.g. Food, Bills, Travel"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <button className="submit-btn" type="submit">
        {initialData.id ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
};

export default ExpenseForm;
