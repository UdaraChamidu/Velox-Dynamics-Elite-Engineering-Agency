import React, { useState } from 'react';
import { User, Save } from 'lucide-react';
import DashboardNav from '../../components/navigation/DashboardNav';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../contexts/AuthContext';

const Settings = () => {
  const { currentUser, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const result = updateProfile(formData);
    
    if (result.success) {
      setMessage('Profile updated successfully!');
    } else {
      setMessage('Failed to update profile.');
    }

    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <DashboardNav>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <Card className="p-8">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold glow-md">
              {currentUser?.name[0] || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{currentUser?.name}</h2>
              <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
              <p className="text-xs text-primary font-semibold mt-1">
                {currentUser?.role === 'admin' ? 'Administrator' : 'Client'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            {message && (
              <div className={`p-4 rounded-lg ${message.includes('success') ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                {message}
              </div>
            )}

            <Button
              type="submit"
              disabled={saving}
              className="w-full"
            >
              <Save className="w-5 h-5 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-border">
            <h3 className="font-semibold mb-4">Account Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account Type:</span>
                <span className="font-medium">{currentUser?.role === 'admin' ? 'Administrator' : 'Client'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">User ID:</span>
                <span className="font-mono text-xs">{currentUser?.id}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardNav>
  );
};

export default Settings;
