"use client";

import { useState } from "react";
import { 
  MoreVertical, 
  CheckCircle, 
  Clock, 
  Download, 
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  ChevronDown,
  TrendingUp,
  TrendingDown
} from "lucide-react";

// Daftar ikon browser dari CDN
const browserIcons = {
  chrome: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg",
  edge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/edge/edge-original.svg",
  firefox: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firefox/firefox-original.svg",
  safari: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/safari/safari-original.svg",
  opera: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opera/opera-original.svg"
};

// Component untuk badge status
const StatusBadge = ({ status }) => {
  const statusConfig = {
    Paid: {
      bg: "bg-green-900/30",
      text: "text-green-400",
      icon: CheckCircle
    },
    Pending: {
      bg: "bg-yellow-900/30",
      text: "text-yellow-400",
      icon: Clock
    }
  };

  const config = statusConfig[status] || statusConfig.Pending;
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${config.bg} ${config.text}`}>
      <Icon size={12} />
      <span>{status}</span>
    </div>
  );
};

export default function DashboardWidgets() {
  const [showCustomerMenu, setShowCustomerMenu] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({});

  const toggleTaskCompletion = (index) => {
    setCompletedTasks(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleCustomerMenuClick = (id, e) => {
    e.stopPropagation();
    setShowCustomerMenu(showCustomerMenu === id ? null : id);
  };

  const browserData = [
    {
      name: "Chrome",
      company: "Google, Inc.",
      users: "35,502",
      percent: "64.75%",
      trend: "up",
      icon: browserIcons.chrome
    },
    {
      name: "Edge",
      company: "Microsoft Corporation, Inc.",
      users: "25,364",
      percent: "24.37%",
      trend: "up",
      icon: browserIcons.edge
    },
    {
      name: "Firefox",
      company: "Mozilla Foundation, Inc.",
      users: "14,635",
      percent: "15.63%",
      trend: "down",
      icon: browserIcons.firefox
    },
    {
      name: "Safari",
      company: "Apple Corporation, Inc.",
      users: "35,657",
      percent: "12.54%",
      trend: "up",
      icon: browserIcons.safari
    },
    {
      name: "Opera",
      company: "Opera, Inc.",
      users: "12,563",
      percent: "8.12%",
      trend: "down",
      icon: browserIcons.opera
    },
  ];

  const customerData = [
    { id: 1, name: "Samantha Melon", status: "Paid", avatar: "SM" },
    { id: 2, name: "Allie Grater", status: "Pending", avatar: "AG" },
    { id: 3, name: "Gabe Lackmen", status: "Pending", avatar: "GL" },
    { id: 4, name: "Manuel Labor", status: "Paid", avatar: "ML" },
    { id: 5, name: "Hercules Bing", status: "Paid", avatar: "HB" },
    { id: 6, name: "Manuel Labor", status: "Pending", avatar: "ML" },
  ];

  const taskData = [
    {
      task: "Accurate information at any given point.",
      time: "Today",
      priority: "high"
    },
    {
      task: "Sharing the information with clients or stakeholders.",
      time: "Today",
      priority: "medium"
    },
    {
      task: "Hearing the information and responding.",
      time: "22 hrs",
      priority: "low"
    },
    {
      task: "Setting up and customizing your own sales.",
      time: "1 Day",
      priority: "medium"
    },
    {
      task: "To have a complete 360° overview of sales information.",
      time: "2 Days",
      priority: "high"
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Browser Usage Widget */}
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl shadow-lg p-5 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-100">Browser Usage</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Filter size={16} className="text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Download size={16} className="text-gray-400" />
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          {browserData.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer group"
              onClick={() => console.log(`Browser: ${item.name}`)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center">
                  <img 
                    src={item.icon} 
                    alt={item.name}
                    className="w-5 h-5"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-8 h-8 rounded-lg bg-blue-500 items-center justify-center text-white text-xs font-bold">
                    {item.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-100">{item.name}</p>
                  <span className="text-xs text-gray-400">{item.company}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-100">{item.users}</p>
                <div className="flex items-center gap-1 text-xs">
                  {item.trend === "up" ? (
                    <TrendingUp size={12} className="text-green-400" />
                  ) : (
                    <TrendingDown size={12} className="text-red-400" />
                  )}
                  <span className={`${item.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                    {item.percent}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 py-2 bg-gray-800/50 hover:bg-gray-800 text-gray-400 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Plus size={16} />
          <span>Add Browser</span>
        </button>
      </div>

      {/* Recent Customers Widget */}
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl shadow-lg p-5 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-100">Recent Customers</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Filter size={16} className="text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Download size={16} className="text-gray-400" />
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          {customerData.map((user, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/50 transition-colors relative"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 font-medium">
                  {user.avatar}
                </div>
                <div>
                  <p className="font-medium text-gray-100">{user.name}</p>
                  <span className="text-xs text-gray-400">
                    ID: #{user.id}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <StatusBadge status={user.status} />
                
                <button 
                  onClick={(e) => handleCustomerMenuClick(user.id, e)}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                >
                  <MoreVertical size={14} className="text-gray-400" />
                </button>
                
                {showCustomerMenu === user.id && (
                  <div className="absolute right-3 top-10 bg-[#1e293b] shadow-lg rounded-lg p-2 z-10 border border-gray-700">
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-800 rounded-md text-gray-300">
                      <Eye size={14} />
                      <span>View Details</span>
                    </button>
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-800 rounded-md text-gray-300">
                      <Edit size={14} />
                      <span>Edit</span>
                    </button>
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-800 rounded-md text-red-400">
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 py-2 bg-gray-800/50 hover:bg-gray-800 text-gray-400 rounded-lg transition-colors flex items-center justify-center gap-2">
          <span>View All Customers</span>
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Main Tasks Widget */}
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl shadow-lg p-5 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-100">Main Tasks</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Filter size={16} className="text-gray-400" />
            </button>
            <button className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-lg text-sm hover:bg-blue-900/50 transition-colors flex items-center gap-2">
              <Plus size={14} />
              <span>Add Task</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          {taskData.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-start justify-between p-3 rounded-lg transition-colors ${
                completedTasks[idx] ? 'opacity-60' : 'hover:bg-gray-800/50'
              }`}
            >
              <div className="flex items-start gap-3 flex-1">
                <button 
                  onClick={() => toggleTaskCompletion(idx)}
                  className={`mt-1 p-1 rounded-full border ${
                    completedTasks[idx] 
                      ? 'bg-green-500/20 border-green-500 text-green-400' 
                      : 'border-gray-600 text-transparent hover:border-blue-500'
                  }`}
                >
                  <CheckCircle size={14} />
                </button>
                
                <div className="flex-1">
                  <p className={`text-sm ${completedTasks[idx] ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                    {item.task}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-gray-400">{item.time}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      item.priority === 'high' 
                        ? 'bg-red-900/30 text-red-400' 
                        : item.priority === 'medium'
                        ? 'bg-yellow-900/30 text-yellow-400'
                        : 'bg-blue-900/30 text-blue-400'
                    }`}>
                      {item.priority} priority
                    </span>
                  </div>
                </div>
              </div>
              
              <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                <MoreVertical size={14} className="text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}