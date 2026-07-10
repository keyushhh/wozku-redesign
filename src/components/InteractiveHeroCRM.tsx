import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  ArrowUpDown, 
  Share2, 
  UserPlus, 
  Award,
  Database,
  SlidersHorizontal,
  TrendingUp,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Advocate } from '../types';

const INITIAL_ADVOCATES: Advocate[] = [
  { id: '1', name: 'Alex Rivera', email: 'alex.r@company.com', role: 'Employee', shares: 24, clicks: 312, status: 'Active', rewardTier: 'Gold' },
  { id: '2', name: 'Marcus Chen', email: 'm.chen@techcorp.io', role: 'Partner', shares: 18, clicks: 245, status: 'Active', rewardTier: 'Gold' },
  { id: '3', name: 'Sarah Jenkins', email: 's.jenkins@growth.co', role: 'Customer', shares: 12, clicks: 189, status: 'Active', rewardTier: 'Silver' },
  { id: '4', name: 'Nadirah Khan', email: 'nadirah@designhub.net', role: 'VIP', shares: 31, clicks: 540, status: 'Active', rewardTier: 'Gold' },
  { id: '5', name: 'Emily Watson', email: 'emily.w@vanguard.com', role: 'Employee', shares: 8, clicks: 92, status: 'Pending', rewardTier: 'Bronze' },
  { id: '6', name: 'Dave Peterson', email: 'dave.p@brandreach.org', role: 'Customer', shares: 5, clicks: 64, status: 'Invited', rewardTier: 'None' },
];

export default function InteractiveHeroCRM() {
  // ================= CRM STATE AND METHODS =================
  const [advocates, setAdvocates] = useState<Advocate[]>(INITIAL_ADVOCATES);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<'shares' | 'clicks' | 'name'>('clicks');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const [customFields, setCustomFields] = useState<{ name: string; type: string; values: Record<string, string> }[]>([]);
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');
  
  const totalShares = useMemo(() => advocates.reduce((sum, a) => sum + a.shares, 0), [advocates]);
  const totalClicks = useMemo(() => advocates.reduce((sum, a) => sum + a.clicks, 0), [advocates]);
  const avgCtr = useMemo(() => {
    if (totalShares === 0) return 0;
    return (totalClicks / totalShares).toFixed(1);
  }, [totalShares, totalClicks]);

  const handleSimulateShare = (id: string) => {
    setAdvocates(prev => prev.map(adv => {
      if (adv.id === id) {
        const addedShares = 1;
        const addedClicks = Math.floor(Math.random() * 15) + 5;
        let currentShares = adv.shares + addedShares;
        let newTier = adv.rewardTier;
        if (currentShares >= 30) newTier = 'Gold';
        else if (currentShares >= 15) newTier = 'Silver';
        else if (currentShares >= 5) newTier = 'Bronze';

        return {
          ...adv,
          shares: currentShares,
          clicks: adv.clicks + addedClicks,
          rewardTier: newTier,
          status: 'Active' as const
        };
      }
      return adv;
    }));
  };

  const handleAddNewAdvocate = () => {
    const names = ['Clara Oswald', 'Julian Vance', 'Sophia Alvarez', 'Kenji Sato', 'Maya Lin', 'David Vance'];
    const roles = ['Employee', 'Customer', 'Partner', 'VIP'] as const;
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    const email = `${randomName.toLowerCase().replace(' ', '.')}@example.com`;
    
    const newAdv: Advocate = {
      id: Date.now().toString(),
      name: randomName,
      email,
      role: randomRole,
      shares: 0,
      clicks: 0,
      status: 'Invited',
      rewardTier: 'None'
    };
    setAdvocates(prev => [newAdv, ...prev]);
  };

  const handleAddCustomColumn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFieldName.trim()) return;
    
    const fieldValues: Record<string, string> = {};
    const mockValues = ['North America', 'EMEA', 'APAC', 'LATAM'];
    
    advocates.forEach(adv => {
      fieldValues[adv.id] = mockValues[Math.floor(Math.random() * mockValues.length)];
    });
    
    setCustomFields(prev => [...prev, {
      name: newFieldName,
      type: 'Text',
      values: fieldValues
    }]);
    setNewFieldName('');
    setShowAddFieldModal(false);
  };

  const handleSort = (field: 'shares' | 'clicks' | 'name') => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredAndSortedAdvocates = useMemo(() => {
    return advocates
      .filter(adv => {
        const matchesSearch = adv.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              adv.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'All' || adv.role === roleFilter;
        return matchesSearch && matchesRole;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return sortOrder === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      });
  }, [advocates, searchTerm, roleFilter, sortField, sortOrder]);

  return (
    <div id="interactive-crm" className="w-full bg-white border border-neutral-200 rounded-[2rem] overflow-hidden shadow-sm backdrop-blur-xl transition-all duration-300">
      
      {/* Top Header: Brand CRM Identity & Real-time Live Counters */}
      <div className="bg-neutral-50 border-b border-neutral-200 px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Database className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h4 className="font-display font-semibold text-neutral-900 text-sm flex items-center gap-2">
              Wozku Advocacy CRM
              <span className="text-[9px] px-2 py-0.5 rounded-full font-mono border bg-indigo-50 text-indigo-700 border-indigo-100 font-bold">
                Live Sandbox
              </span>
            </h4>
            <p className="text-xs text-neutral-500">
              Manage organic distribution assets, partner relationships, and viral share loops
            </p>
          </div>
        </div>

        {/* Real-time Metric Badges */}
        <div className="flex items-center gap-3 self-start md:self-auto overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
          <div className="bg-white border border-neutral-150 px-3 py-1.5 rounded-xl shrink-0 flex flex-col">
            <span className="text-[9px] uppercase font-mono font-bold text-neutral-400">Total Shares</span>
            <span className="text-sm font-bold font-mono text-neutral-800">{totalShares}</span>
          </div>
          <div className="bg-white border border-neutral-150 px-3 py-1.5 rounded-xl shrink-0 flex flex-col">
            <span className="text-[9px] uppercase font-mono font-bold text-neutral-400">Total Clicks</span>
            <span className="text-sm font-bold font-mono text-indigo-600">{totalClicks}</span>
          </div>
          <div className="bg-white border border-neutral-150 px-3 py-1.5 rounded-xl shrink-0 flex flex-col">
            <span className="text-[9px] uppercase font-mono font-bold text-neutral-400">Clicks Per Share</span>
            <span className="text-sm font-bold font-mono text-emerald-600">{avgCtr}x</span>
          </div>
        </div>
      </div>

      {/* Control Actions Panel */}
      <div className="p-4 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 bg-neutral-50/20">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search advocates..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-neutral-200 rounded-lg pl-9 pr-4 py-2 text-xs text-neutral-900 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-neutral-400 shadow-sm"
            />
          </div>
          
          <div className="relative inline-flex items-center">
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="appearance-none bg-white border border-neutral-200 rounded-lg pl-3 pr-8 py-2 text-xs text-neutral-700 focus:outline-none focus:border-indigo-500 transition-colors shadow-sm cursor-pointer"
            >
              <option value="All">All Roles</option>
              <option value="Employee">Employee</option>
              <option value="Customer">Customer</option>
              <option value="Partner">Partner</option>
              <option value="VIP">VIP</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-neutral-500" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleAddNewAdvocate}
            className="flex items-center gap-1.5 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 px-3 py-2 rounded-lg text-xs font-semibold transition-all shadow-sm cursor-pointer"
          >
            <UserPlus className="h-3.5 w-3.5 text-neutral-500" />
            Add Advocate
          </button>
          
          <button 
            onClick={() => setShowAddFieldModal(true)}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all shadow-sm cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Attribute
          </button>
        </div>
      </div>

      {/* Main CRM Spreadsheet Table Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-500 select-none">
              <th className="p-4 font-semibold text-neutral-600">
                <button onClick={() => handleSort('name')} className="flex items-center gap-1 hover:text-neutral-900 transition-colors cursor-pointer">
                  Advocate Name
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="p-4 font-semibold text-neutral-600">Role</th>
              <th className="p-4 font-semibold text-neutral-600">
                <button onClick={() => handleSort('shares')} className="flex items-center gap-1 hover:text-neutral-900 transition-colors cursor-pointer">
                  Approved Shares
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="p-4 font-semibold text-neutral-600">
                <button onClick={() => handleSort('clicks')} className="flex items-center gap-1 hover:text-neutral-900 transition-colors cursor-pointer">
                  Resulting Clicks
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="p-4 font-semibold text-neutral-600">Reward Tier</th>
              {customFields.map((field, idx) => (
                <th key={idx} className="p-4 font-semibold text-indigo-600 capitalize">{field.name}</th>
              ))}
              <th className="p-4 font-semibold text-neutral-600">Status</th>
              <th className="p-4 font-semibold text-neutral-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {filteredAndSortedAdvocates.length === 0 ? (
                <tr>
                  <td colSpan={7 + customFields.length} className="text-center py-10 text-neutral-400">
                    No advocates match your filters. Try adding a new advocate!
                  </td>
                </tr>
              ) : (
                filteredAndSortedAdvocates.map((adv) => (
                  <motion.tr 
                    key={adv.id}
                    layoutId={`advocate-row-${adv.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group"
                  >
                    <td className="p-4 font-medium">
                      <div className="flex flex-col">
                        <span className="text-neutral-900 font-display font-semibold text-sm">{adv.name}</span>
                        <span className="text-neutral-400 font-mono text-[10px] mt-0.5">{adv.email}</span>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                        adv.role === 'Employee' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        adv.role === 'Customer' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        adv.role === 'Partner' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        'bg-purple-50 text-purple-700 border-purple-100'
                      }`}>
                        {adv.role}
                      </span>
                    </td>
                    
                    <td className="p-4 text-neutral-700 font-mono">
                      <motion.span 
                        key={`shares-${adv.shares}`}
                        initial={{ scale: 1.2, color: '#059669' }}
                        animate={{ scale: 1, color: '#3f3f46' }}
                        className="inline-block font-semibold"
                      >
                        {adv.shares}
                      </motion.span>
                    </td>

                    <td className="p-4 text-neutral-700 font-mono">
                      <motion.span 
                        key={`clicks-${adv.clicks}`}
                        initial={{ scale: 1.2, color: '#4f46e5' }}
                        animate={{ scale: 1, color: '#3f3f46' }}
                        className="inline-block font-bold"
                      >
                        {adv.clicks}
                      </motion.span>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <Award className={`h-3.5 w-3.5 ${
                          adv.rewardTier === 'Gold' ? 'text-amber-500 animate-bounce' :
                          adv.rewardTier === 'Silver' ? 'text-neutral-400' :
                          adv.rewardTier === 'Bronze' ? 'text-amber-700' :
                          'text-neutral-300'
                        }`} />
                        <span className={`text-[11px] ${
                          adv.rewardTier === 'Gold' ? 'text-amber-600 font-bold' :
                          adv.rewardTier === 'Silver' ? 'text-neutral-600 font-medium' :
                          adv.rewardTier === 'Bronze' ? 'text-amber-800 font-medium' :
                          'text-neutral-400'
                        }`}>
                          {adv.rewardTier === 'None' ? 'No Tier' : adv.rewardTier}
                        </span>
                      </div>
                    </td>

                    {customFields.map((field, idx) => (
                      <td key={idx} className="p-4 text-neutral-600 font-mono text-[11px]">
                        {field.values[adv.id] || '—'}
                      </td>
                    ))}

                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          adv.status === 'Active' ? 'bg-emerald-500 animate-pulse' :
                          adv.status === 'Invited' ? 'bg-indigo-400' : 'bg-amber-400'
                        }`} />
                        <span className="text-neutral-600 font-medium">{adv.status}</span>
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleSimulateShare(adv.id)}
                        className="opacity-0 group-hover:opacity-100 focus:opacity-100 inline-flex items-center gap-1 bg-white hover:bg-neutral-50 text-neutral-600 px-2.5 py-1 rounded-md transition-all text-[11px] font-semibold border border-neutral-200 cursor-pointer shadow-sm animate-fade-in"
                      >
                        <Share2 className="h-3 w-3 text-neutral-400" />
                        Simulate Share
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Attribute Creator Modal Form */}
      <AnimatePresence>
        {showAddFieldModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-neutral-200 rounded-xl max-w-sm w-full p-6 shadow-xl relative"
            >
              <h3 className="font-display font-bold text-neutral-900 text-lg mb-2">Create Custom Attribute</h3>
              <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
                Define standard metadata fields instantly that trace advocate loyalty and rewards, fully typed.
              </p>
              
              <form onSubmit={handleAddCustomColumn} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-neutral-400 mb-1.5">
                    Field Title
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Region, Department, Segment"
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                    className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-neutral-400 mb-1.5">
                    Data Type
                  </label>
                  <div className="relative w-full">
                    <select className="appearance-none w-full bg-white border border-neutral-200 rounded-lg pl-3 pr-8 py-2 text-xs text-neutral-700 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                      <option>Text (Single Line)</option>
                      <option>Number</option>
                      <option>Single Select Option</option>
                      <option>Boolean</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-neutral-500" />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button 
                    type="button"
                    onClick={() => setShowAddFieldModal(false)}
                    className="bg-transparent hover:bg-neutral-50 text-neutral-500 hover:text-neutral-900 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors shadow-sm cursor-pointer"
                  >
                    Insert Column
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
