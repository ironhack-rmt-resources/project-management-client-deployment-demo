import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import projectsService from "../services/projects.service";


function EditProjectPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate =  useNavigate();
  const { projectId } = useParams();
  
  
  useEffect(() => {
    // axios
    //   .get(
    //     `${API_URL}/api/projects/${projectId}`,
    //     { headers: { Authorization: `Bearer ${storedToken}` } }
    //   )

    projectsService.getProject(projectId)
      .then((response) => {
        const oneProject = response.data;
        setTitle(oneProject.title);
        setDescription(oneProject.description);
      })
      .catch((error) => console.log(error));
    
  }, [projectId]);
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, description };

    // axios
    //   .put(
    //     `${API_URL}/api/projects/${projectId}`,
    //     requestBody,
    //     { headers: { Authorization: `Bearer ${storedToken}` } }
    //   )
    
    projectsService.updateProject(projectId, requestBody)    
      .then((response) => {
        navigate(`/projects/${projectId}`)
      });
  };
  
  
  const deleteProject = () => {

    // axios
    //   .delete(
    //     `${API_URL}/api/projects/${projectId}`,
    //     { headers: { Authorization: `Bearer ${storedToken}` } }
    //   )
    projectsService.deleteProject(projectId)        
      .then(() => navigate("/projects"))
      .catch((err) => console.log(err));
  };  

  
  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>

      <button onClick={deleteProject}>Delete Project</button>
    </div>
  );
}

export default EditProjectPage;