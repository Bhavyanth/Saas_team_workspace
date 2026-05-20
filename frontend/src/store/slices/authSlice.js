import { createSlice } from '@reduxjs/toolkit'

// Mock users for demo
const DEMO_USERS = {
  'manager@projectflow.com': {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'manager@projectflow.com',
    role: 'MANAGER',
    avatar: 'AJ',
    avatarColor: '#6554C0',
    title: 'Engineering Manager',
    department: 'Engineering',
    phone: '+1 (555) 123-4567',
    bio: 'Engineering Manager with 8+ years of experience leading cross-functional teams.',
    joinedDate: '2022-01-15',
  },
  'employee@projectflow.com': {
    id: 'user-2',
    name: 'Sarah Chen',
    email: 'employee@projectflow.com',
    role: 'EMPLOYEE',
    avatar: 'SC',
    avatarColor: '#0052CC',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    phone: '+1 (555) 987-6543',
    bio: 'Passionate frontend developer specializing in React and TypeScript.',
    joinedDate: '2022-06-01',
  },
  'admin@projectflow.com': {
    id: 'user-3',
    name: 'Michael Torres',
    email: 'admin@projectflow.com',
    role: 'ADMIN',
    avatar: 'MT',
    avatarColor: '#00875A',
    title: 'Platform Administrator',
    department: 'IT',
    joinedDate: '2021-03-10',
  },
}

const DEMO_PASSWORDS = {
  'manager@projectflow.com': 'Manager@123',
  'employee@projectflow.com': 'Employee@123',
  'admin@projectflow.com': 'Admin@123',
}

// Load persisted auth
const loadAuth = () => {
  try {
    const saved = localStorage.getItem('pf_auth')
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

const savedAuth = loadAuth()

const initialState = {
  user: savedAuth?.user || null,
  token: savedAuth?.token || null,
  isAuthenticated: !!savedAuth?.token,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.error = null
      // Persist to localStorage
      localStorage.setItem('pf_auth', JSON.stringify({
        user: action.payload.user,
        token: action.payload.token,
      }))
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.isAuthenticated = false
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem('pf_auth')
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      localStorage.setItem('pf_auth', JSON.stringify({
        user: state.user,
        token: state.token,
      }))
    },
    clearError: (state) => {
      state.error = null
    },
    registerSuccess: (state, action) => {
      state.loading = false
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.error = null
      localStorage.setItem('pf_auth', JSON.stringify({
        user: action.payload.user,
        token: action.payload.token,
      }))
    }
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, updateUser, clearError, registerSuccess } = authSlice.actions

// Thunks
export const loginUser = (email, password) => (dispatch) => {
  dispatch(loginStart())
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = DEMO_USERS[email.toLowerCase()]
      const expectedPassword = DEMO_PASSWORDS[email.toLowerCase()]
      if (user && password === expectedPassword) {
        const token = `demo-token-${user.id}-${Date.now()}`
        dispatch(loginSuccess({ user, token }))
        resolve(user)
      } else {
        dispatch(loginFailure('Invalid email or password'))
        reject(new Error('Invalid credentials'))
      }
    }, 800)
  })
}

export const registerUser = (data) => (dispatch) => {
  dispatch(loginStart())
  return new Promise((resolve) => {
    setTimeout(() => {
      const initials = data.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      const user = {
        id: `user-${Date.now()}`,
        name: data.name,
        email: data.email,
        role: data.role || 'EMPLOYEE',
        avatar: initials,
        avatarColor: '#0052CC',
        title: data.role === 'MANAGER' ? 'Team Manager' : 'Team Member',
        department: 'Engineering',
        joinedDate: new Date().toISOString().split('T')[0],
      }
      const token = `demo-token-${user.id}`
      dispatch(registerSuccess({ user, token }))
      resolve(user)
    }, 800)
  })
}

export default authSlice.reducer
