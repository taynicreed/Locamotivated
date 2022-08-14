import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {
    
    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    // 
    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        history.push('/edit-exercise');
    }

    // deletes selected exercise and updates exercise list
    const onDelete = async _id => {
        let delConfirm = window.confirm( 'Do you want to delete this exercise?' );
        if(delConfirm === true){ 
            const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
            if(response.status === 204){
                setExercises(exercises.filter(e => e._id !== _id)); 
                alert('Successfully deleted the exercise');
            } else{
                console.error(`Failed to delete exercise with id = ${_id}, 
                    status code = ${response.status}`);
            }
        } 
    };

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }


    useEffect(() => {
        loadExercises();
    }, []); 

    return (
        <div class="content">
            <h1>Locamotivated</h1>
            <ExerciseList exercises={exercises} 
                onEdit={onEdit} 
                onDelete={onDelete}>
            </ExerciseList>
            <p><Link to="/add-exercise">Log a new exercise</Link></p>
        </div>
    );
}

export default HomePage;