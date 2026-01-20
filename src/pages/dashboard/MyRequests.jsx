import React, { useState } from 'react';
import { FileText, Download, Eye, X } from 'lucide-react';
import DashboardNav from '../../components/navigation/DashboardNav';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ProgressStepper from '../../components/ui/ProgressStepper';
import Timeline from '../../components/ui/Timeline';
import FileManager from '../../components/ui/FileManager';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { exportRequestToPDF } from '../../utils/exportUtils';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const MyRequests = () => {
  const { currentUser } = useAuth();
  const { getUserRequests } = useData();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);

  const requests = getUserRequests(currentUser.id);

  const statusColors = {
    'submitted': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'in_review': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'in_progress': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'completed': 'bg-green-500/20 text-green-400 border-green-500/30',
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    accepted: 'bg-green-500/20 text-green-400 border-green-500/30',
    rejected: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  const handleExportPDF = (request) => {
    exportRequestToPDF({
      id: request.id,
      serviceType: request.service,
      projectName: request.projectName,
      budgetRange: request.budget,
      timeline: request.timeline,
      requirements: request.description,
      status: request.status,
      createdAt: request.createdAt
    });
  };

  // Mock timeline data - in real app, this would come from request history
  const getRequestTimeline = (request) => [
    {
      id: '1',
      type: 'status_change',
      title: 'Request Submitted',
      description: 'Your service request was successfully submitted',
      timestamp: request.createdAt,
      author: currentUser.name
    },
    ...(request.status !== 'pending' && request.status !== 'submitted' ? [
      {
        id: '2',
        type: 'status_change',
        title: 'Under Review',
        description: 'Admin is reviewing your request',
        timestamp: new Date(new Date(request.createdAt).getTime() + 3600000).toISOString(),
        author: 'Admin Team'
      }
    ] : []),
    ...(request.adminReply ? [
      {
        id: '3',
        type: 'comment',
        title: 'Admin Response',
        description: request.adminReply,
        timestamp: request.updatedAt || request.createdAt,
        author: 'Admin Team'
      }
    ] : [])
  ];

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

                 {/* Progress Stepper */}
                <div className="mb-6 pb-6 border-b border-border">
                  <ProgressStepper 
                    currentStep={request.status || 'submitted'} 
                  />
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

                  {/* Attachments */}
                  {request.files && request.files.length > 0 && (
                    <div className="pt-3 border-t border-border">
                      <h4 className="text-sm font-semibold text-muted-foreground mb-3">Attachments</h4>
                      <FileManager files={request.files} readOnly />
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

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowTimeline(true);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Timeline
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExportPDF(request)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Timeline Modal */}
        <AnimatePresence>
          {showTimeline && selectedRequest && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setShowTimeline(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Request Timeline</h2>
                  <button
                    onClick={() => setShowTimeline(false)}
                    className="p-2 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
                  <Timeline events={getRequestTimeline(selectedRequest)} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardNav>
  );
};

export default MyRequests;
