import { createSlice } from '@reduxjs/toolkit'

const today = new Date()
const addDays = (d, n) => {
  const dt = new Date(d)
  dt.setDate(dt.getDate() + n)
  return dt.toISOString().split('T')[0]
}

export const INITIAL_TASKS = [
  // Website Redesign tasks
  {
    id: 'task-1', projectId: 'proj-1', projectName: 'Website Redesign', projectKey: 'WR', projectColor: '#0052CC',
    key: 'WR-1', title: 'Design new homepage mockups', description: 'Create high-fidelity mockups for the new homepage design including hero, features, and CTA sections.',
    status: 'COMPLETED', priority: 'HIGH', assignedTo: 'user-2', assignedName: 'Sarah Chen', assignedAvatar: 'SC', assignedColor: '#0052CC',
    reporter: 'user-1', reporterName: 'Alex Johnson',
    startDate: addDays(today, -20), dueDate: addDays(today, -5),
    estimatedHours: 16, actualHours: 14, storyPoints: 8, progress: 100,
    labels: ['Design', 'UI'], comments: 3, attachments: 2,
    createdAt: addDays(today, -25),
  },
  {
    id: 'task-2', projectId: 'proj-1', projectName: 'Website Redesign', projectKey: 'WR', projectColor: '#0052CC',
    key: 'WR-2', title: 'Implement responsive navigation', description: 'Build the new responsive navigation component with mobile menu, search integration, and accessibility features.',
    status: 'IN_PROGRESS', priority: 'HIGH', assignedTo: 'user-2', assignedName: 'Sarah Chen', assignedAvatar: 'SC', assignedColor: '#0052CC',
    reporter: 'user-1', reporterName: 'Alex Johnson',
    startDate: addDays(today, -10), dueDate: addDays(today, 5),
    estimatedHours: 12, actualHours: 8, storyPoints: 5, progress: 70,
    labels: ['Frontend', 'React'], comments: 5, attachments: 1,
    createdAt: addDays(today, -15),
  },
  {
    id: 'task-3', projectId: 'proj-1', projectName: 'Website Redesign', projectKey: 'WR', projectColor: '#0052CC',
    key: 'WR-3', title: 'SEO optimization and meta tags', description: 'Implement SEO best practices including meta tags, structured data, and sitemap generation.',
    status: 'TO_DO', priority: 'MEDIUM', assignedTo: 'user-2', assignedName: 'Sarah Chen', assignedAvatar: 'SC', assignedColor: '#0052CC',
    reporter: 'user-1', reporterName: 'Alex Johnson',
    startDate: addDays(today, 2), dueDate: addDays(today, 15),
    estimatedHours: 8, actualHours: 0, storyPoints: 3, progress: 0,
    labels: ['SEO'], comments: 1, attachments: 0,
    createdAt: addDays(today, -5),
  },
  {
    id: 'task-4', projectId: 'proj-1', projectName: 'Website Redesign', projectKey: 'WR', projectColor: '#0052CC',
    key: 'WR-4', title: 'Performance optimization (Core Web Vitals)', description: 'Optimize page load times, LCP, FID, and CLS scores to achieve 90+ Google PageSpeed score.',
    status: 'IN_REVIEW', priority: 'HIGH', assignedTo: 'user-5', assignedName: 'Priya Patel', assignedAvatar: 'PP', assignedColor: '#6554C0',
    reporter: 'user-1', reporterName: 'Alex Johnson',
    startDate: addDays(today, -8), dueDate: addDays(today, 3),
    estimatedHours: 20, actualHours: 18, storyPoints: 8, progress: 90,
    labels: ['Performance', 'Frontend'], comments: 7, attachments: 3,
    createdAt: addDays(today, -12),
  },
  // Mobile App v2 tasks
  {
    id: 'task-5', projectId: 'proj-2', projectName: 'Mobile App v2', projectKey: 'MA', projectColor: '#6554C0',
    key: 'MA-1', title: 'Authentication flow redesign', description: 'Redesign the login, registration, and password reset flows with biometric authentication support.',
    status: 'COMPLETED', priority: 'HIGHEST', assignedTo: 'user-4', assignedName: 'James Wilson', assignedAvatar: 'JW', assignedColor: '#00875A',
    reporter: 'user-1', reporterName: 'Alex Johnson',
    startDate: addDays(today, -30), dueDate: addDays(today, -15),
    estimatedHours: 24, actualHours: 26, storyPoints: 13, progress: 100,
    labels: ['Auth', 'Security'], comments: 8, attachments: 4,
    createdAt: addDays(today, -35),
  },
  {
    id: 'task-6', projectId: 'proj-2', projectName: 'Mobile App v2', projectKey: 'MA', projectColor: '#6554C0',
    key: 'MA-2', title: 'Push notification system', description: 'Implement push notifications for task assignments, deadlines, and team mentions using Firebase Cloud Messaging.',
    status: 'IN_PROGRESS', priority: 'HIGH', assignedTo: 'user-4', assignedName: 'James Wilson', assignedAvatar: 'JW', assignedColor: '#00875A',
    reporter: 'user-1', reporterName: 'Alex Johnson',
    startDate: addDays(today, -5), dueDate: addDays(today, 10),
    estimatedHours: 16, actualHours: 10, storyPoints: 8, progress: 60,
    labels: ['Backend', 'Notifications'], comments: 4, attachments: 1,
    createdAt: addDays(today, -8),
  },
  {
    id: 'task-7', projectId: 'proj-2', projectName: 'Mobile App v2', projectKey: 'MA', projectColor: '#6554C0',
    key: 'MA-3', title: 'Offline mode implementation', description: 'Add offline data sync capabilities with conflict resolution for tasks and comments.',
    status: 'TO_DO', priority: 'MEDIUM', assignedTo: 'user-2', assignedName: 'Sarah Chen', assignedAvatar: 'SC', assignedColor: '#0052CC',
    reporter: 'user-1', reporterName: 'Alex Johnson',
    startDate: addDays(today, 5), dueDate: addDays(today, 25),
    estimatedHours: 32, actualHours: 0, storyPoints: 13, progress: 0,
    labels: ['Offline', 'Sync'], comments: 2, attachments: 0,
    createdAt: addDays(today, -3),
  },
  {
    id: 'task-8', projectId: 'proj-2', projectName: 'Mobile App v2', projectKey: 'MA', projectColor: '#6554C0',
    key: 'MA-4', title: 'App store submission preparation', description: 'Prepare screenshots, metadata, privacy policy, and app store listing for iOS App Store and Google Play.',
    status: 'BLOCKED', priority: 'HIGHEST', assignedTo: 'user-6', assignedName: 'Tom Bradley', assignedAvatar: 'TB', assignedColor: '#FF5630',
    reporter: 'user-1', reporterName: 'Alex Johnson',
    startDate: addDays(today, -2), dueDate: addDays(today, -1),
    estimatedHours: 10, actualHours: 3, storyPoints: 5, progress: 30,
    labels: ['Release', 'Marketing'], comments: 11, attachments: 6,
    createdAt: addDays(today, -7),
  },
  // API Migration tasks
  {
    id: 'task-9', projectId: 'proj-3', projectName: 'API Migration', projectKey: 'API', projectColor: '#00875A',
    key: 'API-1', title: 'GraphQL schema design', description: 'Design the GraphQL schema for all existing REST endpoints with proper types, queries, and mutations.',
    status: 'COMPLETED', priority: 'HIGH', assignedTo: 'user-4', assignedName: 'James Wilson', assignedAvatar: 'JW', assignedColor: '#00875A',
    reporter: 'user-1', reporterName: 'Alex Johnson',
    startDate: addDays(today, -40), dueDate: addDays(today, -25),
    estimatedHours: 16, actualHours: 18, storyPoints: 8, progress: 100,
    labels: ['GraphQL', 'Architecture'], comments: 6, attachments: 2,
    createdAt: addDays(today, -45),
  },
  {
    id: 'task-10', projectId: 'proj-3', projectName: 'API Migration', projectKey: 'API', projectColor: '#00875A',
    key: 'API-2', title: 'CI/CD pipeline setup', description: 'Set up automated deployment pipeline with GitHub Actions for staging and production environments.',
    status: 'IN_PROGRESS', priority: 'MEDIUM', assignedTo: 'user-7', assignedName: 'Emma Davis', assignedAvatar: 'ED', assignedColor: '#FF991F',
    reporter: 'user-1', reporterName: 'Alex Johnson',
    startDate: addDays(today, -7), dueDate: addDays(today, 2),
    estimatedHours: 20, actualHours: 15, storyPoints: 8, progress: 75,
    labels: ['DevOps', 'CI/CD'], comments: 3, attachments: 2,
    createdAt: addDays(today, -10),
  },
  // Additional tasks for employee view
  {
    id: 'task-11', projectId: 'proj-1', projectName: 'Website Redesign', projectKey: 'WR', projectColor: '#0052CC',
    key: 'WR-5', title: 'Contact form with validation', description: 'Build contact form with real-time validation, spam protection, and email notification integration.',
    status: 'TESTING', priority: 'MEDIUM', assignedTo: 'user-2', assignedName: 'Sarah Chen', assignedAvatar: 'SC', assignedColor: '#0052CC',
    reporter: 'user-1', reporterName: 'Alex Johnson',
    startDate: addDays(today, -3), dueDate: addDays(today, 1),
    estimatedHours: 10, actualHours: 9, storyPoints: 5, progress: 85,
    labels: ['Frontend', 'Forms'], comments: 2, attachments: 0,
    createdAt: addDays(today, -6),
  },
  {
    id: 'task-12', projectId: 'proj-2', projectName: 'Mobile App v2', projectKey: 'MA', projectColor: '#6554C0',
    key: 'MA-5', title: 'Dark mode implementation', description: 'Add system-aware and manual dark mode toggle with persistent user preference storage.',
    status: 'TO_DO', priority: 'LOW', assignedTo: 'user-2', assignedName: 'Sarah Chen', assignedAvatar: 'SC', assignedColor: '#0052CC',
    reporter: 'user-1', reporterName: 'Alex Johnson',
    startDate: addDays(today, 10), dueDate: addDays(today, 20),
    estimatedHours: 12, actualHours: 0, storyPoints: 5, progress: 0,
    labels: ['UI', 'Theme'], comments: 0, attachments: 1,
    createdAt: addDays(today, -1),
  },
]

const initialState = {
  tasks: INITIAL_TASKS,
  selectedTask: null,
  loading: false,
  error: null,
  filters: {
    status: 'all',
    priority: 'all',
    project: 'all',
    assignee: 'all',
    search: '',
  },
  viewMode: 'list', // 'list' | 'kanban' | 'table'
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.unshift(action.payload)
    },
    updateTask: (state, action) => {
      const idx = state.tasks.findIndex(t => t.id === action.payload.id)
      if (idx !== -1) state.tasks[idx] = { ...state.tasks[idx], ...action.payload }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload)
    },
    moveTask: (state, action) => {
      const { taskId, newStatus } = action.payload
      const task = state.tasks.find(t => t.id === taskId)
      if (task) {
        task.status = newStatus
        task.progress = newStatus === 'COMPLETED' ? 100 : newStatus === 'TO_DO' ? 0 : task.progress
      }
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload
    },
  },
})

export const { addTask, updateTask, deleteTask, moveTask, setSelectedTask, setFilters, setViewMode } = taskSlice.actions
export default taskSlice.reducer
