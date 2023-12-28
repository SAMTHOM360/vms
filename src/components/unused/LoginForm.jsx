import React from 'react';
import { toast } from 'react-toastify';

const customId = "custom-id-yes";

export default function Example(){
  const notify = () => {
    toast("I cannot be duplicated!", {
      toastId: customId
    });
  }

  return (
    <div>
      <button onClick={notify}>Notify</button>
    </div>
  )
}