import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const baseURL = JSON.stringify(process.env.REACT_APP_BASE_URL);
const mockData = [
  {
    id: 1,
    title: "Code mock api",
    description: "Code mock api using axios-mock-adapter",
    is_completed: true,
  },
  {
    id: 2,
    title: "Add new task",
    description: "",
    is_completed: false,
  },
  {
    id: 3,
    title: "Learn PHP",
    description: "Learn PHP from Google",
    is_completed: false,
  },
  {
    id: 4,
    title: "Code Interface",
    description: "Code to-do list interface",
    is_completed: true,
  },
  {
    id: 5,
    title: "Test",
    description: "Test app",
    is_completed: true,
  },
  {
    id: 1,
    title: "Code mock api 2",
    description: "Code mock api using axios-mock-adapter",
    is_completed: true,
  },
  {
    id: 2,
    title: "Add new task",
    description: "",
    is_completed: false,
  },
  {
    id: 3,
    title: "Learn PHP",
    description: "Learn PHP from Google",
    is_completed: false,
  },
  {
    id: 4,
    title: "Code Interface",
    description: "Code to-do list interface",
    is_completed: true,
  },
  {
    id: 5,
    title: "Test",
    description: "Test app",
    is_completed: true,
  },
  {
    id: 1,
    title: "Code mock api 3",
    description: "Code mock api using axios-mock-adapter",
    is_completed: true,
  },
  {
    id: 2,
    title: "Add new task",
    description: "",
    is_completed: false,
  },
  {
    id: 3,
    title: "Learn PHP",
    description: "Learn PHP from Google",
    is_completed: false,
  },
  {
    id: 4,
    title: "Code Interface",
    description: "Code to-do list interface",
    is_completed: true,
  },
  {
    id: 5,
    title: "Test",
    description: "Test app",
    is_completed: true,
  },
];
// initial api instance
const api = axios.create({
  baseURL,
});
// initial mock adapter
const mock = new MockAdapter(api, { delayResponse: 300 });
// Mock Endpoints
mock.onGet("/tasks").reply((config) => {
  // Lấy query parameters từ config.params
  const { page, search } = config.params;
  const start = (page - 1) * 5;
  const end = page * 5;
  if (search === "all") {
    return [200, { data: mockData.slice(start, end), total: mockData.length }];
  } else {
    const filteredTasks = mockData.filter(
      (task) => task.is_completed === JSON.parse(search)
    );
    return [
      200,
      { data: filteredTasks.slice(start, end), total: filteredTasks.length },
    ];
  }
});
mock.onPost("/tasks").reply((config): any => {
  const body = JSON.parse(config.data);
  if (body.title) {
    body.id = mockData.length + 1;
    body.is_completed = false;
    mockData.push(body);
    return [201, { message: "Create new task successfully", data: body }];
  } else {
    return [400, { message: "task is invalid" }];
  }
});

mock.onPatch(/\/tasks\/\d+/).reply((config): any => {
  if (!config.url) {
    return [400, { message: "Bad request: URL is missing" }];
  }

  const param = config.url.split("/").pop();

  if (param) {
    const id = parseInt(param);
    const task = mockData.find((task) => task.id === id);
    if (task) {
      task.is_completed = !task.is_completed;
      return [200, task];
    } else {
      return [404, { message: "Not found any task" }];
    }
  } else {
    return [404, { message: "Not found any task" }];
  }
});

export default api;
