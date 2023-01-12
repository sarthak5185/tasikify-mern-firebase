import React from 'react'
import "./tasksubstyle.css";
const TaskFormsub = ({
  createTask,
  tasktitle,
  handleInputChange,
  isEditing,
  updateTask
}) => (
  <form className="task-form" onSubmit={isEditing ? updateTask:createTask}>
    <input
      type="text"
      placeholder="Add a Todo"
      name="name"
      value={tasktitle}
      onChange={handleInputChange} />
    <button type="submit">{isEditing ? "Edit" : "Add"}</button>
  </form>
);
export default TaskFormsub;