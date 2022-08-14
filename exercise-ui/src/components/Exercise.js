import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Exercise({ exercise, onEdit, onDelete }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td id="link">< MdEdit onClick={() => onEdit(exercise)} /></td>
            <td id="link">< MdDeleteForever onClick={() => onDelete(exercise._id)} /></td>
        </tr>
    );
}

export default Exercise;