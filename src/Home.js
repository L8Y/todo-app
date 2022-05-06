import { app, db } from "./Fire";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import Addicon from "./Addicon";
import Deleteicon from "./DeleteIcon";

const Home = (props) => {
    const [task, setTask] = useState("");
    const [getTask, setgetTask] = useState([]);
    const usersCollectionRef = collection(db, props.userEmail);

    const addTask = (event) => {
        event.preventDefault();
        addDoc(usersCollectionRef, {
            task: task,
            completed: false,
            timestamp: serverTimestamp(),
        })
            .then(() => {
                getData();
            })
            .catch((error) => {
                alert(error);
            });
    };

    const statusUpdate = (event, taskId) => {
        const updateRef = doc(db, props.userEmail, taskId);
        updateDoc(updateRef, {
            completed: event.target.checked,
        }).then(() => {
            getData();
        });
    };

    const getData = async () => {
        const descQuery = query(usersCollectionRef, orderBy("timestamp", "desc"))
        onSnapshot(descQuery, (doc) => {
            setgetTask(
                doc.docs.map((item) => {
                    return { ...item.data(), id: item.id };
                })
            );
        });
    };


    useEffect(() => {
        getData();
    }, []);

    const deleteRecord = (taskId) => {
        let deleteTask = doc(db, props.userEmail, taskId);
        deleteDoc(deleteTask)
            .then(() => {
                getData();
            })

            .catch(() => alert("error"));
    };

    return (
        <div>
            <aside className="logout-layout">
                <button className="button logout-button" onClick={props.logout}>
                    Logout
                </button>
            </aside>
            <section className="task-layout">
                <form className="search-area">
                    <input
                        className="input-task"
                        required
                        type="text"
                        placeholder="Enter the task"
                        onChange={(event) => setTask(event.target.value)}
                    />
                    <button
                        className="addtask-button"
                        onClick={(event) => addTask(event)}
                    >
                        <Addicon />
                    </button>
                </form>

                {getTask.map((item) => {
                    return (
                        <article key={item.id} className="added-tasks">
                            {item.completed ? (
                                <div>
                                    <input
                                        defaultChecked
                                        className="checkbox"
                                        type="checkbox"
                                        onClick={(event) => statusUpdate(event, item.id)}
                                    />
                                    <span className="task-title">
                                        <strike>{item.task}</strike>
                                    </span>
                                </div>
                            ) : (
                                <div>
                                    <input
                                        className="checkbox"
                                        type="checkbox"
                                        onClick={(event) => statusUpdate(event, item.id)}
                                    />
                                    <span className="task-title">{item.task}</span>
                                </div>
                            )}
                            <button
                                className="delete-button"
                                onClick={() => deleteRecord(item.id)}
                            >
                                <Deleteicon />
                            </button>
                        </article>
                    );
                })}
            </section>
        </div>
    );
};

export default Home;