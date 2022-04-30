import { useState } from 'react';
import './planner.scss';

const Planner = () => {
  type ToDo = {
    title: string,
    completed: boolean,
    id: number,
    priority: string,
  }

  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState<ToDo[]>([]);
  const [edit, setEdit] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [priorityValue, setPriorityValue] = useState('priority');
  const [shadowTasks, setShadowTasks] = useState<ToDo[]>([]);

  const optionValue = ['priority', 'high', 'medium', 'low'];
  const getValue = optionValue.map((value) => <option key={Math.random()}>{value}</option>);

  const editToDo = (id:any, title:string) => {
    const editTitle = setEditValue(title);
    const editId = setEdit(id);

    return {
      editTitle,
      editId,
    };
  };

  const saveToDo = (id:any) => {
    const newToDo = [...tasks].map((item) => {
      if (item.id === id) {
        // eslint-disable-next-line no-param-reassign
        item.title = editValue;
      } return item;
    });
    setTasks(newToDo);
    setEdit(null);
  };

  return (
    <div className="planner-wrapper">
      <h1 className="planner-title">My tasks</h1>
      <div className="planner-wrapper__tasks">
        <input
          type="text"
          placeholder="Enter task"
          className="planner__input"
          value={inputValue}
          onChange={(el) => {
            setInputValue(el.target.value);
          }}
        />
        <select className="planner-priority" value={priorityValue} onChange={(el) => setPriorityValue(el.target.value)}>
          {getValue}
        </select>
        <button
          className="planner__btn planner__btn--add"
          onClick={() => {
            const newTask = {
              title: inputValue,
              completed: false,
              id: Math.random(),
              priority: priorityValue,
            };

            const updatePriority = setPriorityValue('');
            const updateTask = setTasks([...tasks, newTask]);
            const updateShadowTasks = setShadowTasks([...shadowTasks, newTask]);
            const updateInput = setInputValue('');

            return {
              updateTask,
              updateInput,
              updatePriority,
              updateShadowTasks,
            };
          }}
        >
          Add task
        </button>
      </div>
      {
          tasks.map((el) => (
            <div className="planner">
              <ul className="planner__tasks">
                <li key={el.id} className={`planner__item planner__item--${el.priority}`}>
                  <label className="planner__label" htmlFor="planner__text">
                    {
                        edit === el.id ? (
                          <input className="d-none" type="text" />
                        ) : (
                          <input
                            type="checkbox"
                            onChange={() => {
                              setTasks(tasks.map((task) => (
                                el.id === task.id ? { ...task, completed: !task.completed } : task)));
                              setShadowTasks(tasks.map((task) => (
                                el.id === task.id ? { ...task, completed: !task.completed } : task)));
                            }}
                          />
                        )
                    }
                    <p id="planner__text" className={el.completed ? 'task-done' : 'task'}>
                      {
                        edit === el.id ? (
                          <div>
                            <input
                              type="text"
                              placeholder="Enter task"
                              className="planner__change"
                              value={editValue}
                              onChange={(e) => {
                                setEditValue(e.target.value);
                              }}
                            />
                          </div>
                        ) : el.title
                        }
                    </p>
                  </label>
                  {
                    edit === el.id ? (
                      <button
                        className="btn"
                        onClick={() => (saveToDo(el.id))}
                      >
                        Save
                      </button>
                    )
                      : (
                        <div className="btns">
                          <button
                            className="planner__btn btn"
                            onClick={() => (editToDo(el.id, el.title))}
                          >
                            Edit
                          </button>
                          <button
                            className="planner__btn btn"
                            onClick={() => {
                              setTasks(tasks.filter((e) => e !== el));
                              setShadowTasks(shadowTasks.filter((e) => e !== el));
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )
                  }
                </li>
              </ul>
            </div>
          ))
       }
      <div className="btns-priority">
        <button
          onClick={() => { setTasks(shadowTasks.filter((high) => high.priority === 'high')); }}
        >
          High priority
        </button>
        <button
          onClick={() => { setTasks(shadowTasks.filter((high) => high.priority === 'medium')); }}
        >
          Medium priority
        </button>
        <button
          onClick={() => { setTasks(shadowTasks.filter((high) => high.priority === 'low')); }}
        >
          Low priority
        </button>
      </div>
      <div className="btns-progress">
        <button
          onClick={() => { setTasks(shadowTasks); }}
        >
          All
        </button>
        <button
          onClick={() => { setTasks(shadowTasks.filter((isDone) => isDone.completed === false)); }}
        >
          In progress
        </button>
        <button
          onClick={() => { setTasks(shadowTasks.filter((isDone) => isDone.completed === true)); }}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default Planner;
