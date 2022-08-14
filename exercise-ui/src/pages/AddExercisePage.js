import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory(); 

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },

        });
        if (response.status === 201){
            alert( 'Successfully added the exercise' );
        } else{
            alert( `Failed to add exercise due to missing or invalid input, 
                status code = ${response.status}` ); 
        }
        history.push('/')
    };
    
    function cancelAdd(){
        history.push('/');
    } 

    return (
        <div class="content">
            <h1>All Aboard!</h1>
            <table id="addExercise">  
            <caption>Log a new exercise</caption>
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
                    <td><select value={unit}  onChange={e => setUnit(e.target.value)}>
                            <option value=''></option>
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
                onClick={addExercise}
            >Save</button>
            <button
                onClick={cancelAdd}
            >Cancel</button>
        </div>
    );
}

export default AddExercisePage;