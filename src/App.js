import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import ExpenseForm from './components/ExpenseForm';
import './App.css';
import ExpenseChart from './components/ExpenseChart';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const fetchExpenses = async () => {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('date', { ascending: false });

    if (!error) setExpenses(data);
  };

  const addExpense = async (expense) => {
    const { error } = await supabase.from('expenses').insert([expense]);
    if (!error) fetchExpenses();
  };

  const updateExpense = async (id, updatedData) => {
    const { error } = await supabase.from('expenses').update(updatedData).eq('id', id);
    if (!error) {
      fetchExpenses();
      setEditingExpense(null);
    }
  };

  const deleteExpense = async (id) => {
    const { error } = await supabase.from('expenses').delete().eq('id', id);
    if (!error) fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const filteredExpenses = expenses.filter((exp) => {
    const matchesCategory = categoryFilter ? exp.category.toLowerCase().includes(categoryFilter.toLowerCase()) : true;
    const matchesDate = dateFilter ? exp.date === dateFilter : true;
    return matchesCategory && matchesDate;
  });

  const total = filteredExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <div className="top-bar">
        <h1 className="app-title">Expensooo 💸 </h1>
        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div className="summary">
        <p>Total Expenses: ₹{total.toFixed(2)}</p>
      </div>

      <div className="main-content">
        {/* LEFT SECTION */}
        <div className="left-section">
          <div className="filters">
            <input
              type="text"
              placeholder="Filter by category..."
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>

          <div className="form-section">
            <ExpenseForm
              onSubmit={editingExpense ? (data) => updateExpense(editingExpense.id, data) : addExpense}
              initialData={editingExpense || {}}
            />
          </div>

          <div className="expense-list">
            {filteredExpenses.map((exp) => (
              <div key={exp.id} className="expense-item">
                <div className="expense-details">
                  <h3>{exp.title}</h3>
                  <p>₹{exp.amount} • {exp.category} • <span>{exp.date}</span></p>
                </div>
                <div className="expense-buttons">
                  <button className="edit-btn" onClick={() => setEditingExpense(exp)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteExpense(exp.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="right-section">
          <div className="chart-section">
            <h3>By Category</h3>
            <ExpenseChart data={filteredExpenses} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
