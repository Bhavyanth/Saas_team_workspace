import { createSlice } from '@reduxjs/toolkit'

const TEAM_MEMBERS = [
  { id: 'user-2', name: 'Sarah Chen', avatar: 'SC', avatarColor: '#0052CC', role: 'EMPLOYEE', title: 'Senior Frontend Developer' },
  { id: 'user-4', name: 'James Wilson', avatar: 'JW', avatarColor: '#00875A', role: 'EMPLOYEE', title: 'Backend Developer' },
  { id: 'user-5', name: 'Priya Patel', avatar: 'PP', avatarColor: '#6554C0', role: 'EMPLOYEE', title: 'UI/UX Designer' },
  { id: 'user-6', name: 'Tom Bradley', avatar: 'TB', avatarColor: '#FF5630', role: 'EMPLOYEE', title: 'QA Engineer' },
  { id: 'user-7', name: 'Emma Davis', avatar: 'ED', avatarColor: '#FF991F', role: 'EMPLOYEE', title: 'DevOps Engineer' },
]

const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    name: 'Website Redesign',
    key: 'WR',
    color: '#0052CC',
    description: 'Complete redesign of the company website with modern UI/UX principles and improved performance metrics.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    progress: 65,
    startDate: '2024-01-15',
    endDate: '2024-04-30',
    budget: 45000,
    members: ['user-2', 'user-5', 'user-1'],
    owner: 'user-1',
    taskCount: { total: 24, completed: 16, inProgress: 5, todo: 3 },
    tags: ['Design', 'Frontend'],
  },
  {
    id: 'proj-2',
    name: 'Mobile App v2',
    key: 'MA',
    color: '#6554C0',
    description: 'New version of the mobile application with enhanced features, better performance, and offline support.',
    status: 'IN_PROGRESS',
    priority: 'CRITICAL',
    progress: 42,
    startDate: '2024-02-01',
    endDate: '2024-06-30',
    budget: 80000,
    members: ['user-4', 'user-2', 'user-6', 'user-1'],
    owner: 'user-1',
    taskCount: { total: 38, completed: 16, inProgress: 12, todo: 10 },
    tags: ['Mobile', 'React Native'],
  },
  {
    id: 'proj-3',
    name: 'API Migration',
    key: 'API',
    color: '#00875A',
    description: 'Migrate legacy REST APIs to GraphQL with improved documentation and developer experience.',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    progress: 78,
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    budget: 30000,
    members: ['user-4', 'user-7', 'user-1'],
    owner: 'user-1',
    taskCount: { total: 18, completed: 14, inProgress: 2, todo: 2 },
    tags: ['Backend', 'API'],
  },
  {
    id: 'proj-4',
    name: 'Marketing Q1',
    key: 'MKT',
    color: '#FF5630',
    description: 'Q1 marketing campaign including social media, content marketing, and email campaigns.',
    status: 'NOT_STARTED',
    priority: 'LOW',
    progress: 10,
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    budget: 15000,
    members: ['user-5', 'user-1'],
    owner: 'user-1',
    taskCount: { total: 12, completed: 1, inProgress: 0, todo: 11 },
    tags: ['Marketing', 'Content'],
  },
  {
    id: 'proj-5',
    name: 'Data Analytics Platform',
    key: 'DAP',
    color: '#FF991F',
    description: 'Build internal analytics dashboard for tracking business KPIs and user behavior.',
    status: 'COMPLETED',
    priority: 'HIGH',
    progress: 100,
    startDate: '2023-10-01',
    endDate: '2024-01-31',
    budget: 55000,
    members: ['user-4', 'user-2', 'user-7', 'user-1'],
    owner: 'user-1',
    taskCount: { total: 32, completed: 32, inProgress: 0, todo: 0 },
    tags: ['Analytics', 'Data'],
  },
]

const initialState = {
  projects: INITIAL_PROJECTS,
  teamMembers: TEAM_MEMBERS,
  selectedProject: null,
  loading: false,
  error: null,
  filters: {
    status: 'all',
    priority: 'all',
    search: '',
  },
}

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload
    },
    addProject: (state, action) => {
      state.projects.unshift(action.payload)
    },
    updateProject: (state, action) => {
      const idx = state.projects.findIndex(p => p.id === action.payload.id)
      if (idx !== -1) state.projects[idx] = { ...state.projects[idx], ...action.payload }
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(p => p.id !== action.payload)
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
  },
})

export const { setProjects, addProject, updateProject, deleteProject, setSelectedProject, setFilters } = projectSlice.actions
export default projectSlice.reducer
