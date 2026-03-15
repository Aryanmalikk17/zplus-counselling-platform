import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Bell,
  ChevronRight,
  LayoutDashboard, 
  Menu,
  X,
  ClipboardList,
  Users,
  Settings,
  LogOut,
  Terminal
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { getAuth } from 'firebase/auth';
import adminStatsService from '../../services/adminStatsApi';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Assessments', path: '/admin/assessments', icon: ClipboardList },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 flex-col bg-white border-r border-gray-200">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-10 w-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-primary-200">
              ZP
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Admin Portal</span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium group ${
                    isActive 
                      ? 'bg-primary-50 text-primary-700 shadow-sm' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
                <ChevronRight className={`ml-auto h-4 w-4 opacity-0 transition-all group-hover:opacity-40`} />
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2 mb-6">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold border-2 border-white shadow-sm">
              {user?.fullName?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">{user?.fullName || 'Admin'}</p>
              <p className="text-xs text-gray-500 font-medium truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-bold hover:bg-red-50 rounded-xl transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-gray-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-10 w-px bg-gray-100 mx-2 hidden sm:block"></div>
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{user?.fullName}</p>
                <div className="flex items-center gap-1.5 justify-end">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Active</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <motion.div 
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            className="w-72 h-full bg-white p-6 shadow-2xl flex flex-col" 
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">ZP</div>
                <span className="font-bold text-gray-900">Admin Portal</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400">
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="space-y-2 flex-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold ${
                      isActive 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>

            <div className="pt-6 mt-auto border-t border-gray-100">
              <button
                onClick={async () => {
                  const auth = getAuth();
                  const token = await auth.currentUser?.getIdToken(true);
                  if (token) {
                    await navigator.clipboard.writeText(token);
                    alert("Full Token Copied!");
                  } else {
                    alert("Failed to fetch token. Are you logged in?");
                  }
                }}
                className="w-full flex items-center gap-3 px-4 py-3 mb-2 text-primary-600 font-bold hover:bg-primary-50 rounded-xl transition-all"
              >
                <Terminal className="h-5 w-5" />
                <span>Copy ID Token</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-bold hover:bg-red-50 rounded-xl transition-all"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// AdminDashboard component
const AdminDashboard: React.FC = () => {
  const [stats, setStats] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const response: any = await adminStatsService.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Assessments', value: stats?.totalAssessments ?? '...', change: '', color: 'blue' },
    { label: 'Active Students', value: stats?.activeStudents ?? '...', change: '', color: 'green' },
    { label: 'Tests Completed', value: stats?.testsCompleted ?? '...', change: '', color: 'purple' },
    // Average score is calculated or removed per phase 1 requirements
    ...(stats?.averageScore && stats.averageScore !== 'N/A' ? [
      { label: 'Average Score', value: stats.averageScore, change: 'Stable', color: 'orange' }
    ] : [])
  ];

  return (
    <AdminLayout title="Dashboard Overview">
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin h-8 w-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat) => (
              <div key={stat.label} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">{stat.label}</p>
                <h3 className="text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
                {stat.change && <p className="text-xs font-bold text-green-600">{stat.change}</p>}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-6">
              <div className="text-center py-10">
                <p className="text-gray-400 font-medium italic text-sm">Real-time activity logs starting soon...</p>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
export { AdminLayout };
