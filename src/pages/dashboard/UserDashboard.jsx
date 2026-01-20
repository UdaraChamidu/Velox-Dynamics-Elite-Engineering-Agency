import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Send, CheckCircle, Clock, XCircle } from 'lucide-react';
import DashboardNav from '../../components/navigation/DashboardNav';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const { getUserRequests, getUserProposals } = useData();

  const requests = getUserRequests(currentUser.id);
  const proposals = getUserProposals(currentUser.id);

  const stats = [
    {
      title: 'Total Requests',
      value: requests.length,
      icon: FileText,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Pending',
      value: requests.filter(r => r.status === 'pending').length,
      icon: Clock,
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Completed',
      value: requests.filter(r => r.status === 'accepted').length,
      icon: CheckCircle,
      color: 'from-purple-600 to-pink-500'
    },
    {
      title: 'Proposals',
      value: proposals.length,
      icon: Send,
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
        <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold">{stat.value}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.title}</div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link to="/dashboard/request-service">
              <Button className="w-full">
                <FileText className="w-5 h-5 mr-2" />
                Request Product/Service
              </Button>
            </Link>
            <Link to="/dashboard/submit-proposal">
              <Button variant="secondary" className="w-full">
                <Send className="w-5 h-5 mr-2" />
                Submit Proposal
              </Button>
            </Link>
          </div>
        </Card>

        {/* Recent Requests */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Requests</h2>
            <Link to="/dashboard/my-requests">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>

          {recentRequests.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No requests yet. Create your first request to get started!</p>
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
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {request.description}
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

export default UserDashboard;
