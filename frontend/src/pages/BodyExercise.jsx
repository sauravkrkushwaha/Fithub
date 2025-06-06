import React, { useEffect, useState } from "react";
import './BodyExercise.css';
import { useParams } from "react-router-dom";

function BodyExercise() {
    const { bodyPart } = useParams(); // expects route like /body-exercise/:bodyPart
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExercises = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:5000/api/body-exercise/${bodyPart}`);
                const data = await res.json();
                setExercises(data.exercises || []);
            } catch (err) {
                setExercises([]);
            } finally {
                setLoading(false);
            }
        };
        fetchExercises();
    }, [bodyPart]);

    if (loading) return <div>Loading...</div>;
    if (!exercises.length) return <div>No exercises found for {bodyPart}.</div>;

    return (
        <>
            <h1 className="BodyPart">{bodyPart?.charAt(0).toUpperCase() + bodyPart?.slice(1)}</h1>
            <div className="exercise-container">
                {exercises.map((exercise, idx) => (
                    <div key={idx} className="exercise-block">
                        <h3 className="exerciseName">{exercise.exercise}</h3>
                        <div className="video-container">
                            {exercise.videos && exercise.videos.map((videoUrl, vIdx) => (
                                <video
                                    key={vIdx}
                                    src={videoUrl}
                                    className="exercise-video"
                                    autoPlay
                                    loop
                                    muted
                                    controls={false}
                                    alt={`${exercise.exercise} Video ${vIdx + 1}`}
                                />
                            ))}
                        </div>
                        <div className="steps">
                            {exercise.instructions && exercise.instructions.map((step, sIdx) => (
                                <div className="step-row" key={sIdx}>
                                    <div className="notation">{sIdx + 1}</div>
                                    <p className="step-text">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default BodyExercise;