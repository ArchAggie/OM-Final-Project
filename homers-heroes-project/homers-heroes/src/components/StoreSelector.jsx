import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const StoreSelector = ({ updateStoreNumber }) => {
  const [storeNumber, setStoreNumber] = useState ('');
  const [showForm, setShowForm] = useState (false);
  const [formSubmitted, setFormSubmitted] = useState (false);
  const [displayStoreNumber, setDisplayStoreNumber] = useState("");

  const handleCancel = () => {
    setShowForm(false)
  };
  
  const handleShowForm = () => {
    setShowForm(true)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisplayStoreNumber(storeNumber);
    updateStoreNumber(storeNumber)
    setShowForm(false);
  }
  

  return (
    <div className="store-selector">
      {/* <div className="store-number-display">
        <h2>{displayStoreNumber}</h2>
      </div> */}
      <div>
        <button className="store-selector-button" onClick={handleShowForm}>
          Select Store
        </button>
      </div>
      <br />
      <Modal
        open={showForm}
        onClose={handleCancel}
      >
        <div className="store-selector-modal">
          <form onSubmit={handleSubmit}>
            <div>
              <h2>Store Selector</h2>
            </div>
            <div>
              <TextField
                className="store-selector"
                required
                pattern="\d{4}"
                type="text"
                placeholder="Store #"
                value={storeNumber}
                onChange={(event) => setStoreNumber(event.target.value)}
                error={displayStoreNumber !== "" && !storeNumber.match(/^\d{4}$/)}
                helperText={
                  displayStoreNumber !== "" && !storeNumber.match(/^\d{4}$/)
                  ? "Please enter a valid store number" : ""
                  }
                fullWidth
                margin="normal"
              />
            </div>
            <div>
              <Button onClick={handleCancel} variant="outlined" style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" disabled={!storeNumber.match(/^\d{4}$/)}>
                Continue
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default StoreSelector;