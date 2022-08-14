import * as exercise from './exercise_model.mjs';
import express from 'express';
//import ExerciseList from '../exercise-ui/src/components/exerciseList.js';

const PORT = 3000;

const app = express();

app.use(express.json());

/**
 * Create a new exercise with the name, reps, weight, unit, date provided in the body
 */
app.post('/exercises', (req, res) => {
    exercise.createExercise(req.body.name, req.body.reps, req.body.weight, 
        req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        })
    
});







/**
 * Retrieve exercises. 
 */

app.get('/exercises', (req, res) => {
  let filter = {};
  if(req.query.name !== undefined) {
      filter = { name: req.query.name };
  
    }
    exercise.retrieveExercises(filter, '', 0)
        .then(exercise => {
            res.json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed '});
        });
});



/**
 * Update the exercise whose id is provided in the path parameter and set
 * its title, year and language to the values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
    exercise.updateExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, 
        req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated !== null) {
                res.json({ _id: req.params._id, name: req.body.name, 
                    reps: req.body.reps, weight: req.body.weight, 
                    unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Exercise not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    exercise.deleteById(req.params._id)
        .then(deletedCount => {
            if(deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Exercise not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
    
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});