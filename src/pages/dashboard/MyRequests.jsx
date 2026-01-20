import React from 'react';
import { FileText } from 'lucide-react';
import DashboardNav from '../../components/navigation/DashboardNav';
import Card from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { formatDistanceToNow } from 'date-fns';

const MyRequests = () => {
  const { currentUser } = useAuth();
  const { getUserRequests } = useData();

  const requests = getUserRequests(currentUser.id);

  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    accepted: 'bg-green-500/20 text-green-400 border-green-500/30',
    rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
    'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  };

  return (
    <DashboardNav>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Requests</h1>

        {requests.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-semibold mb-2">No Requests Yet</h2>
            <p className="text-muted-foreground mb-6">
              You haven't submitted any service requests yet.
            </p>
            <a href="/dashboard/request-service">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:glow-md transition-all">
                Create Your First Request
              </button>
            </a>
          </Card>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{request.service}</h3>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusColors[request.status]}`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Submitted {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  {request.file && (
                    <div className="ml-4 px-3 py-1 bg-muted rounded-lg text-xs">
                      📎 {request.file.name}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">Description</h4>
                    <p className="text-foreground">{request.description}</p>
                  </div>

                  {(request.budget || request.timeline) && (
                    <div className="grid sm:grid-cols-2 gap-4 pt-3 border-t border-border">
                      {request.budget && (
                        <div>
                          <h4 className="text-sm font-semibold text-muted-foreground mb-1">Budget</h4>
                          <p className="text-foreground">{request.budget}</p>
                        </div>
                      )}
                      {request.timeline && (
                        <div>
                          <h4 className="text-sm font-semibold text-muted-foreground mb-1">Timeline</h4>
                          <p className="text-foreground">{request.timeline}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {request.adminReply && (
                    <div className="pt-3 border-t border-border">
                      <h4 className="text-sm font-semibold text-muted-foreground mb-2">Admin Response</h4>
                      <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                        <p className="text-foreground">{request.adminReply}</p>
                        {request.updatedAt && (
                          <p className="text-xs text-muted-foreground mt-2">
                            {formatDistanceToNow(new Date(request.updatedAt), { addSuffix: true })}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardNav>
  );
};

export default MyRequests;
