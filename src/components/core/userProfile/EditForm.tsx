import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../services/firebase";
import Button from "../Button";
import { disable } from "../../../store/slices/editProfile";

const EditForm: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(auth.currentUser?.displayName || "");
  const [error, setError] = useState<string | null>(null);

  const handleCancel = () => {
    dispatch(disable());
  };

  const handleSave = async () => {
    try {
      if (!username) {
        setError("Username cannot be empty.");
        return;
      }

      setError(null);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: username });
        dispatch(disable()); 
      } else {
        setError("User is not authenticated.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknow error occured");
      }
    }
  };

  return (
    <div>
      <h3>Edit Username</h3>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter new username"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
};

export default EditForm;
