import React from 'react'

function TaskFormbsub({createTask,tasktitle,handleInputChange}) {
  return (
    <form className="task-form" onSubmit={createTask}>
    <input
      type="text"
      placeholder="Add a Task"
      name="name"
      value={tasktitle} onChange={handleInputChange}/>
     <button type="submit">Add</button>
  </form>
  ) 
}
export default TaskFormbsub;
