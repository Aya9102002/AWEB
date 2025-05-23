import React, { useEffect, useState } from 'react';
import '../css/task.css';
import axios from 'axios';
import { projects } from '../js/db';

const Tasks = () => {
  const [openModal, setOpenModal] = useState(false);
  
  const [project, setProject] = useState([]);
  const [student, setStudent]= useState([]);

    const [sortproject, setSortProject]= useState([]);


const [Task,setTask] = useState({
  projectname:'',
  taskname:'',
  descripttion:'',
  students:'',
  status:'',
  duedate:''

})

    const [tableData, setTableData]= useState([{}]);


  const userid = 1;




  const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/task/tasks/${userid}`);
        console.log(" Response:", response.data);
if(response.status==200){
setTableData(response.data.data);
}
else{
           console.log(" Error");

}



        }
   
        
      catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };



  const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/project/projects/${userid}`);
        console.log(" Response:", response.data);
if(response.status==200){
  console.log(response.data.data);
  
  setProject(response.data.data);
}
else{
          console.log(" Error");

}



        }
   
        
      catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/student/students`);
        console.log(" Response:", response.data);
if(response.status==200){
setStudent(response.data.data);
}
else{
          console.log(" Error");

}



        }
   
        
      catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    const handleAddTask=(e)=>{

const newTask = {...Task};
newTask[e.target.name]=e.target.value;
setTask(newTask);
console.log(newTask)
    }


const AddTask =async ()=>{// رجوع لاعادة كتابة الكود

const ProjectID = await axios.get(`http://localhost:3000/api/project/projectid/${Task.projectname}`);

const UserID = await axios.get(`http://localhost:3000/api/user/username/${Task.students}`);
const userid  = UserID.data.data[0].user_id;

const Response3 = await axios.get(`http://localhost:3000/api/student/students/${userid}`);


const response = await axios.post("http://localhost:3000/api/task/addtask",{
  
  
name: Task.taskname,
  description: Task.descripttion,
  projectid: ProjectID.data.data[0].project_id,
  status: Task.status,
  duedate: Task.duedate,
  studentid: Response3.data.data[0].student_id,


});
setTask({
      projectname: '',
      taskname: '',
      descripttion: '',
      students: '',
      status: '',
      duedate: ''
    });
  await fetchTask();

    setOpenModal(false);

     
}







    useEffect(() => {
  
fetchProject();
fetchTask();
fetchStudent();
  }, []);

const handleSort =async(e)=>{
  const selected = e.target.value;
  
  if(selected == "Project"){
try{
    const response= await axios.get(`http://localhost:3000/api/task/sort/${userid}`);
  console.log(response.data);

if(response.status == 200){
setTableData(response.data.data);
}
else{

}
}
catch(e){
console.log(e);

}

  }

  else if(selected == "Status"){
 try{
    const response= await axios.get(`http://localhost:3000/api/task/sort/status/${userid}`);
  console.log(response.data);

if(response.status == 200){
setTableData(response.data.data);
}
else{

}
}
catch(e){
console.log(e);

}   

  }
  else if(selected=="Due"){


try{
    const response= await axios.get(`http://localhost:3000/api/task/sort/date/${userid}`);
  console.log(response.data);

if(response.status == 200){
setTableData(response.data.data);
}
else{

}
}
catch(e){
console.log(e);

}  

  }
  else if(selected=="Student"){

try{
    const response= await axios.get(`http://localhost:3000/api/task/sort/name/${userid}`);
  console.log(response.data);

if(response.status == 200){
setTableData(response.data.data);
}
else{

}
}
catch(e){
console.log(e);

}  

  }
}
  return (
    <div className="tasks">
      <div className="top-bar">
        <div className="sort-box">
          <label>Sort By:</label>
<select name='sort' onChange={handleSort}>
            <option value="Status">Task Status</option>
            <option value="Project">Project</option>
            <option value="Due">Due Date</option>
            <option value="Student">Assigned Students</option>
          </select>
        </div>
        <button className="create-btn" onClick={() => setOpenModal(true)}>
          Create New Task
        </button>
      </div>

  
          <div className={`modal ${openModal ? 'show' : ''}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create New Task</h2>
              <span className="close-btn" onClick={() => setOpenModal(false)}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <div className="input-group">
                <label>Project Title:</label>
                <select name='projectname' value={Task.projectname} onChange={handleAddTask}>
                  <option disabled value="">Select a project</option>
             {
  project.map((element, i) => {

    return <option  key={i} >{element.name}</option>;
  })
}
                </select>
              </div>

              <div className="input-group">
                <label>Task Name:</label>
                <input  value={Task.taskname} name ="taskname"type="text" onChange={handleAddTask}/>
              </div>

              <div className="input-group">
                <label>Description:</label>
                <textarea  value={Task.descripttion} name='descripttion' onChange={handleAddTask}></textarea>
              </div>

              <div className="input-group">
                <label>Assigned Students:</label>
                <select  name="students"  value={Task.students} onChange={handleAddTask}>
                  <option value="" disabled>Select a student</option>
                  {

 student.map((element, i) => {

    return <option  key={i} value={element.username} >{element.username}</option>;
  })
}

                  
                </select>
              </div>

              <div className="input-group">
                <label>Status</label>
                <select value = {Task.status}name="status" onChange={handleAddTask}>
                  <option value="" disabled>Select a status</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>On Hold</option>
                  <option>Cancelled</option>
                </select>
              </div>

              <div className="input-group">
                <label>Due Date:</label>
                <input  value={Task.duedate} type="date" name='duedate' onChange={handleAddTask}/>
              </div>

              <button className="submit-btn" onClick={AddTask}>Add Task</button>
            </div>
          </div>
        </div>

      <table className="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Assigned</th>
            <th>Status</th>
            <th>Due</th>
          </tr>
        </thead>
        <tbody>
          {
              tableData.map((el, i) => {
  return (
  
 <tr key={i}>
             <td>{i+1}</td>
            <td>{el.proname}</td>
            <td>{el.taskname}</td>
            <td>{el.description}</td>
            <td>{el.username}</td>
            
            <td >{el.status}</td>  
            <td>{el.duedate}</td>
          </tr>
  );
})}
     
          
         
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
