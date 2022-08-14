import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const EditExercisePage = ({ exerciseToEdit }) => {

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useHistory(); 

    const editExercise = async () => {
        const editedExercise = { name, reps, weight, unit, date};
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200){
            alert( 'Successfully edited the exercise' );
        } else{
            alert( `Failed to edit exercise, status code = ${response.status}` ); 
        }
        history.push('/')
    };

    function cancelEdit(){
        history.push('/');
    } 

    return (
        <div class="content">
            <h1>Track Switching</h1>
            <table id="editExercse">  
            <caption>Edit Exercise</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th id="unit">Unit</th>
                        <th>Date (MM-DD-YY)</th>
                    </tr>
                </thead>
                <tbody>
                    <td><input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)} /></td>
                    <td><input
                            type="number"
                            min="0"
                            value={reps}
                            onChange={e => setReps(e.target.value)} /></td>
                    <td><input
                            type="number"
                            min="0"
                            value={weight}
                            onChange={e => setWeight(e.target.value)} /></td>
                    <td><select value={unit} onChange={e => setUnit(e.target.value)}>
                            <option value="kgs">kgs</option>
                            <option value="lbs">lbs</option>
                        </select></td>
                    <td><input
                            type="text"
                            value={date}
                            onChange={e => setDate(e.target.value)} /></td>
                </tbody>
            </table>
            <button
                onClick={editExercise}
            >Save</button>
            <button
                onClick={cancelEdit}
            >Cancel</button>
        </div>
    );
}

export default EditExercisePage;