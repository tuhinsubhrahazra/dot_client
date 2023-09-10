import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingDialog = ({ open }) => {
  return (
    <Dialog open={open} aria-labelledby="loading-dialog">
      <DialogContent>
        <div style={{ textAlign: 'center' }}>
          <CircularProgress color="primary" />
          <p style={{fontSize:"16px", marginTop:"20px"}}>Loading...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;
