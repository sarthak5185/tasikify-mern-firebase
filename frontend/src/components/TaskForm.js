const TaskForm = ({
  createTask,
  title,
  handleInputChange,
  isEditing,
  updateTodo
}) => (
  <form className="task-form" onSubmit={isEditing ? updateTodo:createTask}>
    <input
      type="text"
      placeholder="Add a Todo"
      name="name"
      value={title}
      onChange={handleInputChange} />
    <button type="submit">{isEditing ? "Edit" : "Add"}</button>
  </form>
);
export default TaskForm;