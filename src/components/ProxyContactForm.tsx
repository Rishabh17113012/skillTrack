
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Mail, Send, Shield, Briefcase } from 'lucide-react';

interface ProxyContactFormProps {
  candidateName: string;
  onClose: () => void;
}

const ProxyContactForm: React.FC<ProxyContactFormProps> = ({ candidateName, onClose }) => {
  const [formData, setFormData] = useState({
    recruiterName: '',
    recruiterEmail: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.recruiterName || !formData.recruiterEmail || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.recruiterEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    // Simulate sending the message (would connect to backend in real app)
    setTimeout(() => {
      toast.success(`Your message to ${candidateName} has been sent!`);
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-gradient-to-r from-skill-lightBlue to-blue-50 rounded-xl p-4 mb-5 shadow-sm">
        <div className="flex items-start">
          <Shield className="h-5 w-5 text-skill-blue mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-skill-blue mb-1">Privacy Protected</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your contact information will be shared with the candidate only after they choose 
              to respond to your initial message.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="recruiterName" className="text-skill-charcoal font-medium">Your Name *</Label>
          <Input 
            id="recruiterName"
            name="recruiterName"
            value={formData.recruiterName}
            onChange={handleChange}
            className="border-skill-gray focus:border-skill-blue shadow-sm"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="recruiterEmail" className="text-skill-charcoal font-medium">Your Email *</Label>
          <Input 
            id="recruiterEmail"
            name="recruiterEmail"
            type="email"
            value={formData.recruiterEmail}
            onChange={handleChange}
            className="border-skill-gray focus:border-skill-blue shadow-sm"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="company" className="text-skill-charcoal font-medium">Company</Label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="border-skill-gray focus:border-skill-blue pl-10 shadow-sm"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message" className="text-skill-charcoal font-medium">Message to {candidateName} *</Label>
        <Textarea 
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={`Hi ${candidateName}, I'm interested in your profile...`}
          className="min-h-[150px] border-skill-gray focus:border-skill-blue shadow-sm resize-none"
          required
        />
      </div>
      
      <div className="flex justify-end gap-3 pt-5">
        <Button 
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-skill-gray hover:bg-skill-gray/30 text-skill-charcoal"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={loading}
          className="bg-gradient-to-r from-skill-blue to-blue-500 hover:from-skill-blue/90 hover:to-blue-500/90 shadow-md"
        >
          {loading ? 'Sending...' : (
            <span className="flex items-center">
              Send Message <Send className="ml-2 h-4 w-4" />
            </span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProxyContactForm;
