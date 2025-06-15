import React, { useState } from 'react';
import { ArrowLeft, User, Building, Mail, Bell, Globe, Shield, LogOut, Edit2 } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useUser } from '../contexts/UserContext';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate }) => {
  const { user, logout } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || ''
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleSave = async () => {
    try {
      // In real app, save to backend
      setEditMode(false);
      // You can implement API call here to update user profile
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleLogout = () => {
    logout();
    onNavigate('login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Profile</h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setEditMode(!editMode)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Profile card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{user.name[0]}</span>
            </div>
            <div className="flex-1">
              {editMode ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full text-2xl font-bold bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Company name"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{user.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                  {user.company && <p className="text-gray-600 dark:text-gray-400">{user.company}</p>}
                </>
              )}
              <div className="flex items-center gap-2 mt-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.type === 'shipowner' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300' : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                }`}>
                  {user.type === 'shipowner' ? 'Ship Owner' : 'Charterer'}
                </span>
                {user.verified && (
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                    ✓ Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          {editMode && (
            <div className="flex gap-3 mt-6 pt-6 border-t dark:border-gray-700">
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 dark:bg-blue-700 text-white py-2 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Account settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700">
          <div className="p-6 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Account Settings</h3>
          </div>
          <div className="p-0">
            <button className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b dark:border-gray-700">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900 dark:text-gray-100">Personal Information</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Update your personal details</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b dark:border-gray-700">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900 dark:text-gray-100">Company Information</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your company profile</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b dark:border-gray-700">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900 dark:text-gray-100">Notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Configure notification preferences</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b dark:border-gray-700">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900 dark:text-gray-100">Privacy & Security</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your privacy settings</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900 dark:text-gray-100">Language & Region</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Change language and regional settings</p>
              </div>
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Your Activity</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">42</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Matches</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">12</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed Deals</p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-6 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
          >
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium">Sign Out</p>
              <p className="text-sm text-red-500 dark:text-red-400">Sign out of your account</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};