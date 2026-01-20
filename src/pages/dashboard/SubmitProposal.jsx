import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Upload } from 'lucide-react';
import DashboardNav from '../../components/navigation/DashboardNav';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input, { Textarea } from '../../components/ui/Input';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useNotifications } from '../../contexts/NotificationContext';

const SubmitProposal = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addProposal } = useData();
  const { addNotification } = useNotifications();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    timeline: '',
    file: null
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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

    // Create proposal
    const newProposal = addProposal({
      ...formData,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email
    });

    // Notify admin
    addNotification({
      userId: 'admin-1',
      title: 'New Proposal Submitted',
      message: `${currentUser.name} has submitted a proposal: ${formData.title}`,
      type: 'proposal',
      relatedId: newProposal.id
    });

    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <DashboardNav>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Submit Proposal</h1>

        <Card className="p-8">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Submit a formal proposal to the Velox Dynamics team. Include all relevant details 
              about your project or collaboration idea.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Proposal Title"
              type="text"
              placeholder="e.g., AI-Powered Analytics Dashboard"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <Textarea
              label="Proposal Description"
              placeholder="Provide a detailed description of your proposal, including objectives, scope, and expected outcomes..."
              rows={8}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Proposed Budget"
                type="text"
                placeholder="e.g., $15,000"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                required
              />

              <Input
                label="Timeline"
                type="text"
                placeholder="e.g., 3 months"
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Upload Proposal Document (PDF)
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-all">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="proposal-upload"
                  accept=".pdf"
                />
                <label htmlFor="proposal-upload" className="cursor-pointer">
                  {formData.file ? (
                    <p className="text-sm text-foreground">{formData.file.name}</p>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground">
                        Click to upload your proposal PDF
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF only (max 10MB)
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
                <Send className="w-5 h-5 mr-2" />
                {loading ? 'Submitting...' : 'Submit Proposal'}
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

export default SubmitProposal;
