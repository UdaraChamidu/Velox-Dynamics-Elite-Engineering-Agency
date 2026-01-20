import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Inbox, DollarSign, TrendingUp } from 'lucide-react';
import DashboardNav from '../../components/navigation/DashboardNav';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

const AdminDashboard = () => {
  const { users } = useAuth();
  const { requests } = useData();

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      link: '/admin/users'
    },
    {
      title: 'Pending Requests',
      value: requests.filter(r => r.status === 'pending').length,
      icon: Inbox,
      color: 'from-pink-500 to-pink-600',
      link: '/admin/requests'
    },
    {
      title: 'Completed Projects',
      value: requests.filter(r => r.status === 'accepted').length,
      icon: TrendingUp,
      color: 'from-purple-600 to-pink-500'
    },
    {
      title: 'Revenue (Mock)',
      value: '$127.5K',
      icon: DollarSign,
      color: 'from-pink-600 to-purple-400'
    }
  ];

  const recentRequests = requests.slice(0, 5);

  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    accepted: 'bg-green-500/20 text-green-400 border-green-500/30',
    rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
    'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  };

  return (
    <DashboardNav>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of system-wide metrics and recent activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const content = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold">
                      {typeof stat.value === 'number' ? stat.value : stat.value}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.title}</div>
                </Card>
              </motion.div>
            );

            return stat.link ? (
              <Link key={index} to={stat.link}>
                {content}
              </Link>
            ) : (
              <div key={index}>{content}</div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link to="/admin/users">
              <Button className="w-full">
                <Users className="w-5 h-5 mr-2" />
                Manage Users
              </Button>
            </Link>
            <Link to="/admin/requests">
              <Button variant="secondary" className="w-full">
                <Inbox className="w-5 h-5 mr-2" />
                View Requests
              </Button>
            </Link>
          </div>
        </Card>

        {/* Recent Requests */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Requests</h2>
            <Link to="/admin/requests">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>

          {recentRequests.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Inbox className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No requests yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 bg-muted/30 rounded-lg border border-border hover:border-primary transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{request.service}</h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full border ${statusColors[request.status]}`}>
                          {request.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        By {request.userName || 'Unknown User'}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground ml-4">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardNav>
  );
};

export default AdminDashboard;
