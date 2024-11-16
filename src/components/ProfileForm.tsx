import React, { useState, useEffect } from 'react';
import { userDetails } from '../types/userDetails';

interface ProfileFormProps {
  user: userDetails | undefined;
  onSave: (formData: userDetails) => void;
  onCancel: () => void;
}

const ProfileForm = ({ user, onSave, onCancel }: ProfileFormProps) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    surname: user?.surname || '',
    email: user?.email || '',
    profileImg: user?.profileImg || '',
    username: user?.username || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        surname: user.surname,
        email: user.email,
        profileImg: user.profileImg,
        username: user.username,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="user-details__form" onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="user-details__form__input"
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="user-details__form__input"
        />
      </label>
      <label>
        Surname:
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          className="user-details__form__input"
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="user-details__form__input"
        />
      </label>
      <label>
        Profile Image URL:
        <input
          type="text"
          name="profileImg"
          value={formData.profileImg}
          onChange={handleChange}
          className="user-details__form__input"
        />
      </label>
      <div className="user-details__form__button-container">
        <button type="submit" className="user-details__form__button-container__button">
          Save
        </button>
        <button type="button" onClick={onCancel} className="user-details__form__button-container__button">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
