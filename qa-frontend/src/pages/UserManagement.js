import React, { useState, useEffect } from 'react';
import './UserManagement.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editingUserId, setEditingUserId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3001/users');
      if (!res.ok) throw new Error('Fetch users failed');
      const data = await res.json();
      setUsers(data);
    } catch {
      setErrors({ api: 'Failed to fetch users' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Invalid email address';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const url = editingUserId
        ? `http://localhost:3001/users/${editingUserId}`
        : 'http://localhost:3001/users';
      const method = editingUserId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.status === 409) {
        setErrors({ api: 'Email already exists' });
        return;
      }

      if (!res.ok) {
        setErrors({ api: 'An error occurred' });
        return;
      }

      //if success, reset form and error states
      setFormData({ name: '', email: '' });
      setEditingUserId(null);
      setErrors({});

      // Kullanıcıları yenile
      await fetchUsers();
    } catch (error) {
      setErrors({ api: 'Network error' });
    }
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email });
    setEditingUserId(user.id);
    setErrors({});
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/users/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        setErrors({ api: 'Delete failed' });
        return;
      }
      await fetchUsers();
    } catch {
      setErrors({ api: 'Network error' });
    }
  };

  return (
    <div className="user-management-container" style={{ padding: '20px' }}>
      <h2>User Management</h2>

      <form className="user-form" onSubmit={handleSubmit} noValidate>
        <input
          name="name"
          data-cy="user-form-name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            setErrors((prev) => ({ ...prev, name: undefined, api: undefined }));
          }}
          required
        />
        {errors.name && (
          <div data-cy="error-name" style={{ color: 'red', visibility: 'visible' }}>
            {errors.name}
          </div>
        )}

        <input
          name="email"
          type="email"
          data-cy="user-form-email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            setErrors((prev) => ({ ...prev, email: undefined, api: undefined }));
          }}
          required
        />
        {errors.email && (
          <div data-cy="error-email" style={{ color: 'red', visibility: 'visible' }}>
            {errors.email}
          </div>
        )}

        <button type="submit" data-cy="user-form-submit">
          {editingUserId ? 'Update' : 'Create'} User
        </button>

        {errors.api && (
          <div
            data-cy="error-api"
            style={{ color: 'red', marginTop: 10, visibility: 'visible' }}
            role="alert"
          >
            {errors.api}
          </div>
        )}
      </form>

      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} data-cy="user-row">
            {user.name} - {user.email}{' '}
            <button data-cy="edit-button" onClick={() => handleEdit(user)}>
             <FaEdit style={{ marginRight: 6, verticalAlign: 'middle' }} /> Edit
              </button>
              <button data-cy="delete-button" onClick={() => handleDelete(user.id)}>
  <FaTrash style={{ marginRight: 6, verticalAlign: 'middle' }} /> Delete
</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
