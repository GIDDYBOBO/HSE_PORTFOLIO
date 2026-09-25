import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Credential, InquiryMessage } from '../../types';
import { Megaproject } from '../../data/projectsData';
import { 
  subscribeToCredentials, 
  subscribeToProjects, 
  subscribeToInquiries,
  addCredentialItem, 
  updateCredentialItem, 
  deleteCredentialItem,
  addProjectItem, 
  updateProjectItem, 
  deleteProjectItem,
  updateInquiryStatus,
  deleteInquiryItem
} from '../../lib/portfolioService';
import { 
  LayoutDashboard, 
  Award, 
  Briefcase, 
  Mail, 
  LogOut, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  ExternalLink, 
  ArrowLeft, 
  X, 
  Save, 
  ShieldCheck, 
  Menu,
  Sparkles,
  Building2,
  Calendar,
  Layers,
  Clock,
  RefreshCw,
  Eye,
  Sun,
  Moon
} from 'lucide-react';

type AdminTab = 'overview' | 'credentials' | 'projects' | 'inquiries';

interface AdminDashboardProps {
  onBackToPortfolio: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToPortfolio }) => {
  const { currentUser, logout } = useAuth();
  const { theme } = useTheme();
  const [currentTab, setCurrentTab] = useState<AdminTab>('credentials');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Real-time Firestore state
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [projects, setProjects] = useState<Megaproject[]>([]);
  const [inquiries, setInquiries] = useState<InquiryMessage[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modals for CRUD
  const [editingCredential, setEditingCredential] = useState<Credential | null>(null);
  const [isNewCredentialModalOpen, setIsNewCredentialModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Megaproject | null>(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryMessage | null>(null);

  // Feedback Notification
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Subscribe to real-time updates from Firebase
  useEffect(() => {
    setLoadingData(true);
    const unsubCreds = subscribeToCredentials((data) => {
      setCredentials(data);
      setLoadingData(false);
    });

    const unsubProjects = subscribeToProjects((data) => {
      setProjects(data);
    });

    const unsubInquiries = subscribeToInquiries((data) => {
      setInquiries(data);
    });

    return () => {
      unsubCreds();
      unsubProjects();
      unsubInquiries();
    };
  }, []);

  // Filtered lists
  const filteredCredentials = credentials.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.issuer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProjects = projects.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#131314] text-neutral-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#1e1f20] border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 font-bold text-sm">
            EO
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-snug sm:leading-tight">Executive Admin</h1>
            <p className="text-[10px] text-neutral-400 font-mono">Engr. Osazee Directorship</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-300"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#1e1f20] border-r border-white/10 flex flex-col justify-between transition-transform duration-300
        md:translate-x-0 md:static md:w-64
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-5 space-y-6">
          {/* Brand Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-sky-500/20">
                EO
              </div>
              <div>
                <h2 className="text-sm font-bold text-white font-display leading-snug sm:leading-tight">Executive CMS</h2>
                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Real-Time Sync</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            <button
              onClick={() => { setCurrentTab('overview'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                currentTab === 'overview'
                  ? 'bg-sky-500/15 text-sky-300 border border-sky-400/30'
                  : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview &amp; Metrics</span>
            </button>

            <button
              onClick={() => { setCurrentTab('credentials'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                currentTab === 'credentials'
                  ? 'bg-sky-500/15 text-sky-300 border border-sky-400/30'
                  : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4" />
                <span>Credentials</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-mono text-neutral-400">
                {credentials.length}
              </span>
            </button>

            <button
              onClick={() => { setCurrentTab('projects'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                currentTab === 'projects'
                  ? 'bg-sky-500/15 text-sky-300 border border-sky-400/30'
                  : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4" />
                <span>Project Highlights</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-mono text-neutral-400">
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => { setCurrentTab('inquiries'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                currentTab === 'inquiries'
                  ? 'bg-sky-500/15 text-sky-300 border border-sky-400/30'
                  : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>Inbound Inquiries</span>
              </div>
              {inquiries.filter(i => i.status === 'new').length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-sky-500 text-white text-[10px] font-mono font-bold animate-pulse">
                  {inquiries.filter(i => i.status === 'new').length}
                </span>
              )}
            </button>
          </nav>

          <div className="pt-4 border-t border-white/10 space-y-1.5">
            <button
              onClick={onBackToPortfolio}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono text-neutral-300 hover:bg-white/5 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Public Site</span>
            </button>
          </div>
        </div>

        {/* User Badge & Logout */}
        <div className="p-4 border-t border-white/10 bg-black/20 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-xs font-bold text-sky-300">
              {currentUser?.email?.[0].toUpperCase() || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-medium text-white truncate">
                {currentUser?.displayName || 'Engr. Osazee'}
              </p>
              <p className="text-[10px] text-neutral-400 font-mono truncate">
                {currentUser?.email || 'admin@iyenomaosazee.com'}
              </p>
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-medium transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
        {/* Floating Notification Toast */}
        {notification && (
          <div className={`mb-6 p-4 rounded-2xl border text-xs font-mono flex items-center justify-between shadow-xl animate-fade-in ${
            notification.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{notification.message}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-neutral-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* TAB 1: OVERVIEW & METRICS */}
        {currentTab === 'overview' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold font-display text-white tracking-tight leading-snug sm:leading-tight">
                  Executive Operations Overview
                </h1>
                <p className="text-xs text-neutral-400 font-mono">
                  Live Firestore telemetry &amp; portfolio content health
                </p>
              </div>

              <button
                onClick={onBackToPortfolio}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-neutral-200 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Live Portfolio</span>
              </button>
            </div>

            {/* Metrics Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
                  <span>Credentials</span>
                  <Award className="w-4 h-4 text-sky-400" />
                </div>
                <div className="text-3xl font-bold text-white font-mono">{credentials.length}</div>
                <p className="text-[11px] text-neutral-400">
                  {credentials.filter(c => c.highlight).length} pinned to executive hero
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
                  <span>Project Highlights</span>
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-white font-mono">{projects.length}</div>
                <p className="text-[11px] text-neutral-400">Mega-civil &amp; statutory works</p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
                  <span>Advisory Inquiries</span>
                  <Mail className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-bold text-white font-mono">{inquiries.length}</div>
                <p className="text-[11px] text-neutral-400">
                  {inquiries.filter(i => i.status === 'new').length} new pending review
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
                  <span>Database State</span>
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                </div>
                <div className="text-xl font-bold text-emerald-400 font-mono">Connected</div>
                <p className="text-[11px] text-neutral-400">Cloud Firestore v10 / Zero-Trust</p>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 space-y-4">
              <h2 className="text-sm font-semibold text-white font-mono uppercase tracking-wider leading-snug sm:leading-tight">
                Management Shortcuts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => { setCurrentTab('credentials'); setIsNewCredentialModalOpen(true); }}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left flex items-start gap-3 transition-all"
                >
                  <Plus className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-white">Add New Credential</div>
                    <div className="text-xs text-neutral-400">Register new ISO audit or professional charter status</div>
                  </div>
                </button>

                <button
                  onClick={() => { setCurrentTab('projects'); setIsNewProjectModalOpen(true); }}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left flex items-start gap-3 transition-all"
                >
                  <Plus className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-white">Add Megaproject Highlight</div>
                    <div className="text-xs text-neutral-400">Publish a new high-consequence civil safety record</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CREDENTIALS MANAGER (DATA TABLE + CRUD) */}
        {currentTab === 'credentials' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold font-display text-white tracking-tight leading-snug sm:leading-tight">
                  Professional Credentials
                </h1>
                <p className="text-xs text-neutral-400 font-mono">
                  Update certifications, chartered registrations, and auditing credentials in real-time
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsNewCredentialModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Credential</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search credentials by title, designation (e.g. CMIOSH, ISPON), or issuer..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-neutral-900/80 border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </div>

            {/* Data Table */}
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/40 text-neutral-400 font-mono uppercase text-[10px] tracking-wider border-b border-white/10">
                    <tr>
                      <th className="py-3.5 px-4">Credential &amp; Title</th>
                      <th className="py-3.5 px-4">Designation</th>
                      <th className="py-3.5 px-4">Issuing Authority</th>
                      <th className="py-3.5 px-4">Credential ID / Year</th>
                      <th className="py-3.5 px-4">Highlight</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {filteredCredentials.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-neutral-400 font-mono">
                          No credentials found matching &quot;{searchQuery}&quot;.
                        </td>
                      </tr>
                    ) : (
                      filteredCredentials.map((cred) => (
                        <tr key={cred.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-semibold text-white">{cred.title}</div>
                            <div className="text-[11px] text-neutral-400 line-clamp-1 max-w-xs">{cred.description}</div>
                          </td>
                          <td className="py-3 px-4 font-mono font-medium text-sky-400">
                            {cred.designation}
                          </td>
                          <td className="py-3 px-4 text-neutral-300">
                            {cred.issuer}
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-neutral-400">
                            <div>{cred.credentialId || '—'}</div>
                            <div>{cred.year || '—'}</div>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              type="button"
                              onClick={async () => {
                                await updateCredentialItem(cred.id, { highlight: !cred.highlight });
                                showNotification(`Updated highlight status for ${cred.designation}`);
                              }}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer transition-colors ${
                                cred.highlight 
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30 font-bold' 
                                  : 'bg-white/5 text-neutral-400 hover:text-white border border-white/5'
                              }`}
                            >
                              {cred.highlight ? '★ Pinned' : 'Standard'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => setEditingCredential(cred)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                                title="Edit Credential"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  if (confirm(`Are you sure you want to delete "${cred.title}"?`)) {
                                    await deleteCredentialItem(cred.id);
                                    showNotification(`Deleted credential ${cred.designation}`);
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 transition-colors cursor-pointer"
                                title="Delete Credential"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROJECTS MANAGER (DATA TABLE + CRUD) */}
        {currentTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold font-display text-white tracking-tight leading-snug sm:leading-tight">
                  Megaproject Highlights
                </h1>
                <p className="text-xs text-neutral-400 font-mono">
                  Manage signature high-consequence civil safety and governance records
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsNewProjectModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Megaproject</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects by title, client, or summary..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-neutral-900/80 border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-neutral-900/80 border border-white/10 text-xs font-mono text-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                <option value="all">All Categories</option>
                <option value="Bridges & Marine">Bridges &amp; Marine</option>
                <option value="Expressways & Corridors">Expressways &amp; Corridors</option>
                <option value="Heavy Civil & High-Rise">Heavy Civil &amp; High-Rise</option>
                <option value="Environmental & Industrial">Environmental &amp; Industrial</option>
                <option value="Statutory Governance">Statutory Governance</option>
              </select>
            </div>

            {/* Data Table */}
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/40 text-neutral-400 font-mono uppercase text-[10px] tracking-wider border-b border-white/10">
                    <tr>
                      <th className="py-3.5 px-4">Project Title</th>
                      <th className="py-3.5 px-4">Client / Entity</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Period</th>
                      <th className="py-3.5 px-4">Safety / Man-Hours</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {filteredProjects.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-neutral-400 font-mono">
                          No project highlights found matching current filter.
                        </td>
                      </tr>
                    ) : (
                      filteredProjects.map((proj) => (
                        <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-semibold text-white">{proj.title}</div>
                            <div className="text-[11px] text-neutral-400 font-mono">{proj.location}</div>
                          </td>
                          <td className="py-3 px-4 text-neutral-300">
                            {proj.client}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-400/20 text-sky-300 font-mono text-[10px]">
                              {proj.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono text-neutral-300">
                            {proj.period}
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-emerald-400">
                            <div>{proj.manHours}</div>
                            <div className="text-[10px] text-neutral-400 truncate max-w-[140px]">{proj.safetyRecord}</div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => setEditingProject(proj)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                                title="Edit Project"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  if (confirm(`Are you sure you want to delete project "${proj.title}"?`)) {
                                    await deleteProjectItem(proj.id);
                                    showNotification(`Deleted project "${proj.title}"`);
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 transition-colors cursor-pointer"
                                title="Delete Project"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: INBOUND ADVISORY INQUIRIES */}
        {currentTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold font-display text-white tracking-tight leading-snug sm:leading-tight">
                  Inbound Client Inquiries
                </h1>
                <p className="text-xs text-neutral-400 font-mono">
                  Consultation requests, keynote invitations, and audit inquiries
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/40 text-neutral-400 font-mono uppercase text-[10px] tracking-wider border-b border-white/10">
                    <tr>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Client Name &amp; Org</th>
                      <th className="py-3.5 px-4">Contact Info</th>
                      <th className="py-3.5 px-4">Segment / Timeframe</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {inquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-neutral-400 font-mono">
                          No client inquiries logged in Firestore yet.
                        </td>
                      </tr>
                    ) : (
                      inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 px-4 font-mono text-neutral-400 whitespace-nowrap">
                            {inq.date || 'Recent'}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-white">{inq.name}</div>
                            <div className="text-[11px] text-neutral-400">{inq.organization}</div>
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px]">
                            <div className="text-sky-300">{inq.email}</div>
                            {inq.phone && <div className="text-neutral-400">{inq.phone}</div>}
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-neutral-300">
                            <div>{inq.segment}</div>
                            <div className="text-[10px] text-neutral-500">{inq.timeframe}</div>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={inq.status}
                              onChange={async (e) => {
                                await updateInquiryStatus(inq.id, e.target.value as any);
                                showNotification(`Updated inquiry status to ${e.target.value}`);
                              }}
                              className="px-2 py-1 rounded bg-black/40 border border-white/10 font-mono text-[11px] text-neutral-200"
                            >
                              <option value="new">New</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="archived">Archived</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => setSelectedInquiry(inq)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                                title="View Message"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  if (confirm('Delete this inquiry permanently?')) {
                                    await deleteInquiryItem(inq.id);
                                    showNotification('Inquiry deleted');
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 transition-colors cursor-pointer"
                                title="Delete Inquiry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT CREDENTIAL */}
        {(isNewCredentialModalOpen || editingCredential) && (
          <CredentialModal
            initialData={editingCredential}
            onClose={() => {
              setIsNewCredentialModalOpen(false);
              setEditingCredential(null);
            }}
            onSave={async (data) => {
              if (editingCredential) {
                await updateCredentialItem(editingCredential.id, data);
                showNotification(`Updated credential ${data.designation}`);
              } else {
                await addCredentialItem(data);
                showNotification(`Added credential ${data.designation}`);
              }
              setIsNewCredentialModalOpen(false);
              setEditingCredential(null);
            }}
          />
        )}

        {/* MODAL: ADD / EDIT MEGAPROJECT */}
        {(isNewProjectModalOpen || editingProject) && (
          <ProjectModal
            initialData={editingProject}
            onClose={() => {
              setIsNewProjectModalOpen(false);
              setEditingProject(null);
            }}
            onSave={async (data) => {
              if (editingProject) {
                await updateProjectItem(editingProject.id, data);
                showNotification(`Updated project "${data.title}"`);
              } else {
                await addProjectItem(data);
                showNotification(`Added project "${data.title}"`);
              }
              setIsNewProjectModalOpen(false);
              setEditingProject(null);
            }}
          />
        )}

        {/* MODAL: VIEW INQUIRY DETAILS */}
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-3xl bg-neutral-900 border border-white/10 p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white font-display leading-snug">Inquiry Message Dossier</h3>
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 text-neutral-300">
                  <div>
                    <span className="text-neutral-500 font-mono">From:</span> {selectedInquiry.name}
                  </div>
                  <div>
                    <span className="text-neutral-500 font-mono">Organization:</span> {selectedInquiry.organization}
                  </div>
                  <div>
                    <span className="text-neutral-500 font-mono">Email:</span> {selectedInquiry.email}
                  </div>
                  <div>
                    <span className="text-neutral-500 font-mono">Phone:</span> {selectedInquiry.phone || 'N/A'}
                  </div>
                  <div>
                    <span className="text-neutral-500 font-mono">Segment:</span> {selectedInquiry.segment}
                  </div>
                  <div>
                    <span className="text-neutral-500 font-mono">Timeframe:</span> {selectedInquiry.timeframe}
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-neutral-400 font-mono mb-1">Message Content:</div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-neutral-200 text-sm whitespace-pre-wrap leading-relaxed">
                    {selectedInquiry.message}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// ----------------- SUB-COMPONENTS: CREDENTIAL MODAL ----------------- //

interface CredentialModalProps {
  initialData: Credential | null;
  onClose: () => void;
  onSave: (data: Omit<Credential, 'id'>) => Promise<void>;
}

const CredentialModal: React.FC<CredentialModalProps> = ({ initialData, onClose, onSave }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [designation, setDesignation] = useState(initialData?.designation || '');
  const [issuer, setIssuer] = useState(initialData?.issuer || '');
  const [year, setYear] = useState(initialData?.year || '');
  const [credentialId, setCredentialId] = useState(initialData?.credentialId || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [highlight, setHighlight] = useState(initialData?.highlight ?? true);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSave({
        title,
        designation,
        issuer,
        year,
        credentialId,
        description,
        highlight
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-lg rounded-3xl bg-neutral-900 border border-white/10 p-6 space-y-4 shadow-2xl my-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-base font-bold text-white font-display leading-snug">
            {initialData ? 'Edit Credential' : 'Add Professional Credential'}
          </h3>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-neutral-300 font-mono mb-1">Credential Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Chartered Safety and Health Professional"
              className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-300 font-mono mb-1">Designation Acronym</label>
              <input
                type="text"
                required
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="e.g. CMIOSH"
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-sm focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-mono mb-1">Year / Issue Date</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. Issued Dec 2013"
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-300 font-mono mb-1">Issuing Authority</label>
              <input
                type="text"
                required
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="e.g. Institution of Occupational Safety and Health"
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-mono mb-1">Credential / Roll ID</label>
              <input
                type="text"
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
                placeholder="e.g. ID: 100175"
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-sm focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-300 font-mono mb-1">Professional Scope Description</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail the significance, peer-review interview mandate, or chartered responsibilities..."
              className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="cred-highlight"
              checked={highlight}
              onChange={(e) => setHighlight(e.target.checked)}
              className="rounded text-sky-500 focus:ring-sky-500 bg-black/40 border-white/20 w-4 h-4"
            />
            <label htmlFor="cred-highlight" className="text-neutral-300 cursor-pointer select-none">
              Pin to public Hero badges (Highlighted credential)
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{submitting ? 'Saving to Firestore...' : 'Save Credential'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ----------------- SUB-COMPONENTS: PROJECT MODAL ----------------- //

interface ProjectModalProps {
  initialData: Megaproject | null;
  onClose: () => void;
  onSave: (data: Omit<Megaproject, 'id'>) => Promise<void>;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ initialData, onClose, onSave }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [client, setClient] = useState(initialData?.client || '');
  const [category, setCategory] = useState<Megaproject['category']>(initialData?.category || 'Bridges & Marine');
  const [location, setLocation] = useState(initialData?.location || '');
  const [period, setPeriod] = useState(initialData?.period || '');
  const [manHours, setManHours] = useState(initialData?.manHours || '');
  const [safetyRecord, setSafetyRecord] = useState(initialData?.safetyRecord || '');
  const [summary, setSummary] = useState(initialData?.summary || '');
  const [challenge, setChallenge] = useState(initialData?.challenge || '');
  const [hseSolution, setHseSolution] = useState(initialData?.hseSolution || '');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSave({
        title,
        client,
        category,
        location,
        period,
        startYear: initialData?.startYear || 2024,
        endYear: initialData?.endYear || 'Present',
        timelineDate: period,
        manHours,
        safetyRecord,
        summary,
        challenge,
        hseSolution,
        metrics: initialData?.metrics || [
          { label: 'Safety Record', value: safetyRecord || 'Zero Harm' },
          { label: 'Cumulative Man-Hours', value: manHours || 'Recorded' }
        ],
        tags: initialData?.tags || [category, 'Executive Directorship']
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-xl rounded-3xl bg-neutral-900 border border-white/10 p-6 space-y-4 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-base font-bold text-white font-display leading-snug">
            {initialData ? 'Edit Megaproject Highlight' : 'Add Megaproject Highlight'}
          </h3>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-neutral-300 font-mono mb-1">Project Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Second River Niger Bridge & Federal Expressway Arterials"
              className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-300 font-mono mb-1">Client / Regulatory Authority</label>
              <input
                type="text"
                required
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. Federal Ministry of Works"
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-mono mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Bridges & Marine">Bridges &amp; Marine</option>
                <option value="Expressways & Corridors">Expressways &amp; Corridors</option>
                <option value="Heavy Civil & High-Rise">Heavy Civil &amp; High-Rise</option>
                <option value="Environmental & Industrial">Environmental &amp; Industrial</option>
                <option value="Statutory Governance">Statutory Governance</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-300 font-mono mb-1">Geographic Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Asaba – Onitsha, Niger River Corridor"
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-mono mb-1">Execution Period</label>
              <input
                type="text"
                required
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="e.g. 2018 – 2023"
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-300 font-mono mb-1">Safe Man-Hours</label>
              <input
                type="text"
                required
                value={manHours}
                onChange={(e) => setManHours(e.target.value)}
                placeholder="e.g. 15.4M Safe Man-Hours"
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-mono mb-1">Safety Record Outcome</label>
              <input
                type="text"
                required
                value={safetyRecord}
                onChange={(e) => setSafetyRecord(e.target.value)}
                placeholder="e.g. Zero Overwater Fatalities"
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-300 font-mono mb-1">Executive Scope Summary</label>
            <textarea
              rows={2}
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="High-level executive narrative of project execution..."
              className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-300 font-mono mb-1">Critical Engineering Challenge</label>
              <textarea
                rows={2}
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                placeholder="e.g. Complex marine currents, deep pylon caissons..."
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-mono mb-1">HSE &amp; Hygiene Solution</label>
              <textarea
                rows={2}
                value={hseSolution}
                onChange={(e) => setHseSolution(e.target.value)}
                placeholder="e.g. Acoustic radar perimeter, automated hydration..."
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-medium flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{submitting ? 'Saving to Firestore...' : 'Save Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
