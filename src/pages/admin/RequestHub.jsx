import React, { useState } from 'react';
import { Check, X, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import DashboardNav from '../../components/navigation/DashboardNav';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { Textarea } from '../../components/ui/Input';
import { useData } from '../../contexts/DataContext';
import { useNotifications } from '../../contexts/NotificationContext';

const RequestHub = () => {
  const { requests, updateRequest } = useData();
  const { addNotification } = useNotifications();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [adminReply, setAdminReply] = useState('');
  const [actionType, setActionType] = useState(null);

  const columns = {
    pending: requests.filter(r => r.status === 'pending'),
    'in-progress': requests.filter(r => r.status === 'in-progress'),
    accepted: requests.filter(r => r.status === 'accepted'),
    rejected: requests.filter(r => r.status === 'rejected')
  };

  const columnConfig = {
    pending: { title: 'Pending', color: 'border-yellow-500/30 bg-yellow-500/5' },
    'in-progress': { title: 'In Progress', color: 'border-blue-500/30 bg-blue-500/5' },
    accepted: { title: 'Accepted', color: 'border-green-500/30 bg-green-500/5' },
    rejected: { title: 'Rejected', color: 'border-red-500/30 bg-red-500/5' }
  };

  const handleAction = (action) => {
    if (!selectedRequest) return;

    let newStatus = selectedRequest.status;
    let notificationMessage = '';

    if (action === 'accept') {
      newStatus = 'accepted';
      notificationMessage = `Your request for "${selectedRequest.service}" has been accepted!`;
    } else if (action === 'reject') {
      newStatus = 'rejected';
      notificationMessage = `Your request for "${selectedRequest.service}" has been reviewed.`;
    } else if (action === 'reply' && adminReply.trim()) {
      notificationMessage = `Admin replied to your request for "${selectedRequest.service}"`;
    }

    // Update request
    updateRequest(selectedRequest.id, {
      status: newStatus,
      adminReply: adminReply.trim() || selectedRequest.adminReply
    });

    // Send notification to user
    addNotification({
      userId: selectedRequest.userId,
      title: action === 'reply' ? 'Admin Reply' : `Request ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
      message: notificationMessage,
      type: 'request_update',
      relatedId: selectedRequest.id
    });

    // Close modal
    setSelectedRequest(null);
    setAdminReply('');
    setActionType(null);
  };

  return (
    <DashboardNav>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Request Hub</h1>
          <p className="text-muted-foreground">
            Manage incoming client requests and proposals
          </p>
        </div>

        {/* Kanban Board */}
        <div className="grid lg:grid-cols-4 gap-6">
          {Object.entries(columns).map(([status, items]) => (
            <div key={status}>
              <div className={`p-4 rounded-t-lg border-t-4 ${columnConfig[status].color}`}>
                <h3 className="font-semibold mb-1">{columnConfig[status].title}</h3>
                <p className="text-sm text-muted-foreground">{items.length} request{items.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="space-y-3 mt-3">
                {items.length === 0 ? (
                  <Card className="p-6 text-center">
                    <p className="text-sm text-muted-foreground">No requests</p>
                  </Card>
                ) : (
                  items.map((request) => (
                    <Card
                      key={request.id}
                      className="p-4 cursor-pointer"
                      onClick={() => setSelectedRequest(request)}
                    >
                      <h4 className="font-semibold mb-2">{request.service}</h4>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {request.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{request.userName}</span>
                        <span>{formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}</span>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Request Detail Modal */}
      <Modal
        isOpen={!!selectedRequest}
        onClose={() => {
          setSelectedRequest(null);
          setAdminReply('');
          setActionType(null);
        }}
        title="Request Details"
        size="lg"
      >
        {selectedRequest && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">{selectedRequest.service}</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Client</p>
                  <p className="font-medium">{selectedRequest.userName}</p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.userEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Submitted</p>
                  <p className="font-medium">
                    {formatDistanceToNow(new Date(selectedRequest.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-muted-foreground">{selectedRequest.description}</p>
            </div>

            {(selectedRequest.budget || selectedRequest.timeline) && (
              <div className="grid sm:grid-cols-2 gap-4">
                {selectedRequest.budget && (
                  <div>
                    <h4 className="font-semibold mb-1">Budget</h4>
                    <p className="text-muted-foreground">{selectedRequest.budget}</p>
                  </div>
                )}
                {selectedRequest.timeline && (
                  <div>
                    <h4 className="font-semibold mb-1">Timeline</h4>
                    <p className="text-muted-foreground">{selectedRequest.timeline}</p>
                  </div>
                )}
              </div>
            )}

            {selectedRequest.file && (
              <div>
                <h4 className="font-semibold mb-2">Attached File</h4>
                <div className="px-3 py-2 bg-muted rounded-lg text-sm inline-block">
                  📎 {selectedRequest.file.name}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-semibold mb-2">Admin Reply</h4>
              <Textarea
                placeholder="Write a message to the client..."
                rows={4}
                value={adminReply}
                onChange={(e) => setAdminReply(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
              <Button
                onClick={() => handleAction('accept')}
                className="flex-1"
              >
                <Check className="w-5 h-5 mr-2" />
                Accept
              </Button>
              <Button
                onClick={() => handleAction('reject')}
                variant="danger"
                className="flex-1"
              >
                <X className="w-5 h-5 mr-2" />
                Reject
              </Button>
              <Button
                onClick={() => handleAction('reply')}
                variant="outline"
                className="flex-1"
                disabled={!adminReply.trim()}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Send Reply
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardNav>
  );
};

export default RequestHub;
