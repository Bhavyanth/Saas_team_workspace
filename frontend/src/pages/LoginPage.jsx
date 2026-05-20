import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Layers, Mail, Lock, LogIn, ShieldCheck, UserCheck, ArrowRight } from 'lucide-react'
import { loginUser } from '../store/slices/authSlice'

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { loading, error } = useSelector(state => state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await dispatch(loginUser(email, password))
      dispatch({
        type: 'ui/addToast',
        payload: { type: 'success', title: 'Welcome Back!', message: `Logged in successfully as ${user.name}.` }
      })
      navigate('/dashboard')
    } catch (err) {
      dispatch({
        type: 'ui/addToast',
        payload: { type: 'error', title: 'Login Failed', message: 'Invalid email or password.' }
      })
    }
  }

  const handleDemoLogin = (role) => {
    if (role === 'manager') {
      setEmail('manager@projectflow.com')
      setPassword('Manager@123')
    } else if (role === 'employee') {
      setEmail('employee@projectflow.com')
      setPassword('Employee@123')
    }
  }

  return (
    <div className="auth-container" style={{ display: 'flex', width: '100vw', height: '100vh', background: '#F4F5F7' }}>
      
      {/* Left panel: Vibrant Gradient Feature Panel */}
      <div className="auth-left-panel" style={{ 
        flex: 1, 
        background: 'linear-gradient(135deg, #0747A6 0%, #0052CC 50%, #4C9AFF 100%)', 
        color: 'white', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '64px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Circles */}
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', top: '-100px', left: '-100px' }} />
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', bottom: '-50px', right: '-50px' }} />

        <div className="flex items-center gap-3 mb-12">
          <div style={{ width: 36, height: 36, borderRadius: 6, background: 'white', display: 'flex', alignItems: 'center', justifyCenter: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Layers size={20} color="#0052CC" />
          </div>
          <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }}>ProjectFlow</span>
        </div>

        <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.2, marginBottom: 24 }}>
          Streamline tasks.<br />Enhance productivity.
        </h1>
        
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: 40, maxWidth: 450 }}>
          Manage your development cycles, collaborate with multi-functional squads, and monitor sprint progression all in a single workspace.
        </p>

        <div className="flex flex-col gap-6" style={{ maxWidth: 400 }}>
          <div className="flex items-start gap-4">
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ArrowRight size={14} />
            </div>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Role-Based Dashboards</h4>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Optimized views tailored for managers and individual team contributors.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ArrowRight size={14} />
            </div>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Interactive Kanban Boards</h4>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Drag and drop cards, configure priorities, and manage blockers in real-time.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ArrowRight size={14} />
            </div>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Analytics & Reports</h4>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Visualize sprint burndown charts, workload density, and task status allocations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel: Authentication Form */}
      <div className="auth-right-panel" style={{ 
        width: 500, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '64px', 
        background: 'white' 
      }}>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#172B4D', marginBottom: 8 }}>Sign In</h2>
          <p style={{ fontSize: 14, color: '#6B778C' }}>Access your team's project workspace.</p>
        </div>

        {error && (
          <div style={{ background: '#FFEBE6', color: '#DE350B', padding: 12, borderRadius: 6, fontSize: 13, marginBottom: 20 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="form-group">
            <label className="form-label required">Email Address</label>
            <div className="relative">
              <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6B778C' }} />
              <input 
                type="email" 
                className="form-control" 
                style={{ paddingLeft: 40 }}
                placeholder="you@company.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label required">Password</label>
            <div className="relative">
              <Lock size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6B778C' }} />
              <input 
                type="password" 
                className="form-control" 
                style={{ paddingLeft: 40 }}
                placeholder="••••••••" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full justify-center py-2 text-base font-semibold"
            disabled={loading}
          >
            {loading ? 'Signing in...' : (
              <>
                <LogIn size={18} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Quick Login */}
        <div style={{ marginTop: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: '#DFE1E6' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#97A0AF', textTransform: 'uppercase', letterSpacing: 0.5 }}>Try Demo Accounts</span>
            <div style={{ flex: 1, height: 1, background: '#DFE1E6' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <button 
              type="button" 
              className="btn btn-secondary justify-center flex-col p-3 text-center" 
              onClick={() => handleDemoLogin('manager')}
              style={{ height: 'auto', border: '1px solid #DFE1E6', background: email === 'manager@projectflow.com' ? 'rgba(0, 82, 204, 0.05)' : 'white' }}
            >
              <ShieldCheck size={20} color="#0052CC" style={{ marginBottom: 4 }} />
              <span className="font-semibold" style={{ fontSize: 12, color: '#172B4D' }}>Manager / Lead</span>
              <span style={{ fontSize: 10, color: '#6B778C' }}>Full admin features</span>
            </button>

            <button 
              type="button" 
              className="btn btn-secondary justify-center flex-col p-3 text-center" 
              onClick={() => handleDemoLogin('employee')}
              style={{ height: 'auto', border: '1px solid #DFE1E6', background: email === 'employee@projectflow.com' ? 'rgba(0, 82, 204, 0.05)' : 'white' }}
            >
              <UserCheck size={20} color="#00875A" style={{ marginBottom: 4 }} />
              <span className="font-semibold" style={{ fontSize: 12, color: '#172B4D' }}>Team Employee</span>
              <span style={{ fontSize: 10, color: '#6B778C' }}>My Tasks focus</span>
            </button>
          </div>
        </div>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: '#6B778C' }}>
          Don't have an account? <a href="/register" className="font-semibold" style={{ color: '#0052CC' }}>Sign Up</a>
        </div>
      </div>
    </div>
  )
}
