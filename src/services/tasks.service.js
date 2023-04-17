import axios from 'axios';

class TasksService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/tasks
  createTask = (requestBody) => {
    return this.api.post('/api/tasks', requestBody);
  }

  // GET /api/tasks/:id
  getTask = (id) => {
    return this.api.get(`/api/tasks/${id}`);
  }

  // PUT /api/tasks/:id
  updateTask = (id, requestBody) => {
    return this.api.put(`/api/tasks/${id}`, requestBody);
  }

  // DELETE /api/tasks/:id
  deleteTask = (id) => {
    return this.api.delete(`/api/tasks/${id}`);
  } 


}

// Create one instance (object) of the service
const tasksService = new TasksService();

export default tasksService;