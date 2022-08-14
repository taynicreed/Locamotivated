// Get the mongoose object
//import { query } from 'express';
import mongoose from 'mongoose';

// Prepare to the database exercises_db in the MongoDB server running locally on port c7017
mongoose.connect(
    "mongodb://localhost:27017/exercises_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true},
    unit: { type: String, required: true},
    date: { type: String, required: true, match: /(\d{2}\-{1}){2}\d{2}/g }
});

/**
 * Compile the model from the schema. 
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);


/**
 * Create an exercise
 * @param {String} name 
 * @param {Number} reps 
 * @param {Number} weight 
 * @param {String} unit 
 * @param {String} date
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */

 const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, 
        unit: unit, date: date });
    return exercise.save();
}



/**
 * Retrieve all exercises in database
 **/

const retrieveExercises = async (filter, projection, limit) => {
    const query =  Exercise.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
} 



/**
 * Replace the name, reps, weight, unit, date properties of the exercise with the id value provided
 * @param {String} _id 
 * @param {String} name 
 * @param {Number} reps 
 * @param {Number} weight 
 * @param {String} unit 
 * @param {String} date
 * @returns A promise. Resolves to the number of documents modified
 */

 const updateExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({ _id: _id }, { name: name, 
        reps: reps, weight: weight, unit: unit, date: date });
    return result.nModified;
}


/**
 * Delete the exercise with provided id value
 * @param {String} _id 
 * @returns A promise. Resolves to the count of deleted documents
 */
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
}


export { createExercise, retrieveExercises, updateExercise, deleteById };

