import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Upload } from 'lucide-react';
import DashboardNav from '../../components/navigation/DashboardNav';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input, { Textarea, Select } from '../../components/ui/Input';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useNotifications } from '../../contexts/NotificationContext';

const RequestService = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addRequest } = useData();
  const { addNotification, users } = useNotifications();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    service: '',
    description: '',
    budget: '',
    timeline: '',
    file: null
  });

  const serviceOptions = [
    { value: '', label: 'Select a service...' },
    { value: 'AI & Machine Learning', label: 'AI & Machine Learning' },
    { value: 'Computer Vision', label: 'Computer Vision' },
    { value: 'N8N Automation', label: 'N8N Automation' },
    { value: 'Full-Stack Development', label: 'Full-Stack Development' },
    { value: 'Consulting', label: 'Consulting' },
    { value: 'Other', label: 'Other' }
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate file upload (convert to base64 for mock storage)
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, file: { name: file.name, data: reader.result } });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create request
    const newRequest = addRequest({
      ...formData,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email
    });

    // Notify admin users
    // In a real app, you'd fetch admin users from the server
    // For now, we'll send notification to admin-1
    addNotification({
      userId: 'admin-1',
      title: 'New Service Request',
      message: `${currentUser.name} has requested ${formData.service}`,
      type: 'request',
      relatedId: newRequest.id
    });

    setLoading(false);
    navigate('/dashboard/my-requests');
  };

  return (
    <DashboardNav>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Request Product/Service</h1>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Select
              label="Service Type"
              options={serviceOptions}
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              required
            />

            <Textarea
              label="Project Description"
              placeholder="Describe your project requirements, goals, and any specific features you need..."
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Budget Range"
                type="text"
                placeholder="e.g., $5,000 - $10,000"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />

              <Input
                label="Expected Timeline"
                type="text"
                placeholder="e.g., 2-3 months"
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Attach File (Optional)
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-all">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.txt"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  {formData.file ? (
                    <p className="text-sm text-foreground">{formData.file.name}</p>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, DOC, DOCX, TXT (max 10MB)
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardNav>
  );
};

export default RequestService;
