import React from 'react';
import { Users, Shield, User } from 'lucide-react';
import DashboardNav from '../../components/navigation/DashboardNav';
import Card from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';

const UserManagement = () => {
  const { users } = useAuth();

  const getRoleBadge = (role) => {
    if (role === 'admin') {
      return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">Admin</span>;
    }
    return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">Client</span>;
  };

  return (
    <DashboardNav>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-muted-foreground">
            Manage all registered users and their permissions
          </p>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <h2 className="text-xl font-semibold">All Users ({users.length})</h2>
          </div>

          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-5 bg-muted/30 rounded-lg border border-border hover:border-primary transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold glow-sm flex-shrink-0">
                    {user.name ? user.name[0] : user.email[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg truncate">{user.name || 'No Name'}</h3>
                      {getRoleBadge(user.role)}
                      {user.role === 'admin' && <Shield className="w-4 h-4 text-purple-400" />}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p className="font-mono text-xs">ID: {user.id}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {users.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No users found</p>
            </div>
          )}
        </Card>

        {/* User Stats */}
        <div className="grid sm:grid-cols-2 gap-6 mt-6">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {users.filter(u => u.role === 'admin').length}
                </div>
                <div className="text-sm text-muted-foreground">Administrators</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {users.filter(u => u.role === 'client').length}
                </div>
                <div className="text-sm text-muted-foreground">Clients</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardNav>
  );
};

export default UserManagement;
