
import React from 'react'
import style from "../AddNewCourse.module.css";
import { Delete } from '@mui/icons-material';
 
const DeleteButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={style.deleteBtn}>
      <Delete />
    </button>
  )
}

export default DeleteButton