import React, { useState } from 'react';
import './App.css';

function App() {
    const [exercises, setExercises] = useState([
        { name: 'Running 🏃‍♂️', duration: 30, calories: 300, date: '3/15/2025' },
        { name: 'Weight Lifting 🏋️‍♀️', duration: 45, calories: 200, date: '3/15/2025' }
    ]);

    const [formActive, setFormActive] = useState(false);
    const [newExercise, setNewExercise] = useState({
        name: '',
        duration: '',
        calories: ''
    });

    const toggleForm = () => {
        setFormActive(!formActive);
    };

    const handleInputChange = (e) => {
        setNewExercise({ ...newExercise, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const exercise = {
            name: newExercise.name,
            duration: newExercise.duration,
            calories: newExercise.calories,
            date: new Date().toLocaleDateString()
        };

        setExercises([...exercises, exercise]);
        setNewExercise({ name: '', duration: '', calories: '' });
        toggleForm();
    };

    const updateMetrics = () => {
        const totalDuration = exercises.reduce((acc, curr) => acc + parseInt(curr.duration), 0);
        const totalCalories = exercises.reduce((acc, curr) => acc + parseInt(curr.calories), 0);

        return {
            totalExercises: exercises.length,
            totalDuration,
            totalCalories
        };
    };

    return (
        <div className="App">
            <header className="header">
                <nav className="nav container">
                    <h1>🏋️‍♀️ WORKOUT WISE 🏃‍♂️</h1>
                    <button className="primary-btn" onClick={toggleForm}>+ Add Exercise 📝</button>
                </nav>
            </header>

            <main className="container">
                <section className="dashboard">
                    <div className="metric-card">
                        <h3>Total Exercises 🏋️‍♂️</h3>
                        <p>{updateMetrics().totalExercises}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Total Duration ⏰</h3>
                        <p>{updateMetrics().totalDuration} min</p>
                    </div>
                    <div className="metric-card">
                        <h3>Calories Burned 🔥</h3>
                        <p>{updateMetrics().totalCalories} kcal</p>
                    </div>
                </section>

                <form id="exercise-form" className={formActive ? 'add-exercise-form form-active' : 'add-exercise-form'}>
                    <input type="text" className="exercise-input" name="name" placeholder="Exercise Name 🏋️‍♀️" value={newExercise.name} onChange={handleInputChange} required />
                    <input type="number" className="exercise-input" name="duration" placeholder="Duration (minutes) ⏰" value={newExercise.duration} onChange={handleInputChange} required />
                    <input type="number" className="exercise-input" name="calories" placeholder="Calories Burned 🔥" value={newExercise.calories} onChange={handleInputChange} required />
                    <button type="submit" className="primary-btn" onClick={handleSubmit}>Add Exercise 🏃‍♂️</button>
                </form>

                <section className="exercise-grid">
                    {exercises.map((exercise, index) => (
                        <div key={index} className="exercise-card">
                            <h3>{exercise.name}</h3>
                            <p>Duration: {exercise.duration} min ⏰</p>
                            <p>Calories: {exercise.calories} kcal 🔥</p>
                            <p className="exercise-date">{exercise.date}</p>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}

export default App;
