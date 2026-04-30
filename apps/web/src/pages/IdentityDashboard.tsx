import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  Fingerprint, 
  Key, 
  RefreshCw, 
  Zap,
  ArrowUpRight,
  TrendingDown,
  Clock,
  History,
  Layers,
  Database,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const lifecycleData = [
  { name: 'Mon', provisioned: 12, rotated: 45, decommissioned: 2 },
  { name: 'Tue', provisioned: 15, rotated: 38, decommissioned: 1 },
  { name: 'Wed', provisioned: 25, rotated: 52, decommissioned: 5 },
  { name: 'Thu', provisioned: 10, rotated: 60, decommissioned: 0 },
  { name: 'Fri', provisioned: 8, rotated: 45, decommissioned: 3 },
  { name: 'Sat', provisioned: 3, rotated: 12, decommissioned: 0 },
  { name: 'Sun', provisioned: 2, rotated: 15, decommissioned: 1 },
];

const KPI_CARDS = [
  { title: 'Active Principals', value: '1,248', trend: '+4%', color: 'sky', icon: Fingerprint },
  { title: 'Credentials Rotated', value: '842', trend: 'Healthy', color: 'sky', icon: RefreshCw },
  { title: 'Avg Credential Age', value: '42d', trend: 'Optimal', color: 'sky', icon: Clock },
  { title: 'Compliance Score', value: '98%', trend: 'Stable', color: 'slate', icon: ShieldCheck },
];

const IdentityDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Identity Lifecycle Hub</h1>
          <p className="text-slate-400">Strategic oversight of global service principals and credential security.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Audit Report
          </button>
          <button className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            New Principal
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-${card.color}-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <div className={`text-xs font-medium ${card.trend.includes('+') || card.trend === 'Optimal' || card.trend === 'Healthy' ? 'text-emerald-400' : 'text-slate-400'}`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lifecycle Activity Graph */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Weekly Lifecycle Velocity</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lifecycleData}>
                <defs>
                  <linearGradient id="colorRotate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="rotated" stroke="#0ea5e9" fill="url(#colorRotate)" name="Credentials Rotated" />
                <Area type="monotone" dataKey="provisioned" stroke="#10b981" fill="transparent" strokeDasharray="5 5" name="New Principals" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Principal Risk Profile</h3>
          <div className="flex-1 space-y-6">
            {[
              { name: 'Low Risk', value: 85, color: 'bg-emerald-500' },
              { name: 'Medium Risk', value: 12, color: 'bg-amber-500' },
              { name: 'High Risk', value: 3, color: 'bg-rose-500' },
            ].map((profile) => (
              <div key={profile.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{profile.name}</span>
                  <span className="text-slate-400">{profile.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${profile.color}`} style={{ width: `${profile.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Principals Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Managed Service Principals</h3>
          <button className="text-sky-400 hover:text-sky-300 text-sm font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Principal Name</th>
                <th className="px-6 py-4 font-semibold">Owner</th>
                <th className="px-6 py-4 font-semibold">Client ID</th>
                <th className="px-6 py-4 font-semibold">Risk</th>
                <th className="px-6 py-4 font-semibold">Next Rotation</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { name: 'PaymentProcessor', owner: 'team-fintech', client: 'sp-7a2b', risk: 'LOW', rotation: '12 Days', status: 'ACTIVE' },
                { name: 'LogCollector', owner: 'team-sre', client: 'sp-b142', risk: 'MEDIUM', rotation: 'Overdue', status: 'WARN' },
                { name: 'DevOps-Pipeline', owner: 'team-devops', client: 'sp-c918', risk: 'LOW', rotation: '45 Days', status: 'ACTIVE' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Fingerprint className="w-4 h-4 text-sky-400" />
                      <span className="text-sm font-medium text-slate-300">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{row.owner}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{row.client}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      row.risk === 'LOW' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 
                      'text-amber-400 border-amber-500/20 bg-amber-500/10'
                    }`}>
                      {row.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{row.rotation}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${
                      row.status === 'ACTIVE' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 
                      'text-amber-400 border-amber-500/20 bg-amber-500/10'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sky-400 hover:text-sky-300 text-xs font-bold uppercase tracking-wider">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IdentityDashboard;
