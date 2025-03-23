
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCandidates } from '@/context/CandidateContext';
import { toast } from 'sonner';
import { Plus, Trash2, Save } from 'lucide-react';
import { Candidate } from '@/context/CandidateContext';

interface CandidateEditFormProps {
  candidateId: string;
  onClose: () => void;
}

const CandidateEditForm: React.FC<CandidateEditFormProps> = ({ candidateId, onClose }) => {
  const { candidates, updateCandidate } = useCandidates();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    domain: '',
  });
  
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);
  
  useEffect(() => {
    // Find the candidate in context
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      setFormData({
        name: candidate.name,
        skills: candidate.skills.join(', '),
        domain: candidate.domain || '',
      });
      setProjects(candidate.projects);
    }
  }, [candidateId, candidates]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProjectNameChange = (id: string, value: string) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, name: value } : project
    ));
  };
  
  const addProject = () => {
    setProjects([...projects, { id: Date.now().toString(), name: '' }]);
  };
  
  const removeProject = (id: string) => {
    if (projects.length > 1) {
      setProjects(projects.filter(project => project.id !== id));
    } else {
      toast.error("You need at least one project");
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    
    if (!formData.skills.trim()) {
      toast.error("Skills are required");
      return;
    }
    
    if (projects.some(project => !project.name.trim())) {
      toast.error("All projects must have names");
      return;
    }
    
    // Create updated candidate object
    const skillsArray = formData.skills
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill !== '');
    
    const updatedCandidate = {
      id: candidateId,
      name: formData.name,
      skills: skillsArray,
      projects: projects,
      domain: formData.domain,
      profileStrength: skillsArray.length + projects.length,
    };
    
    try {
      setLoading(true);
      await updateCandidate(updatedCandidate);
      toast.success("Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="edit-name">Full Name</Label>
        <Input
          id="edit-name"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleInputChange}
          className="border-skill-gray focus:border-skill-blue"
        />
      </div>
      
      {/* Skills */}
      <div className="space-y-2">
        <Label htmlFor="edit-skills">Skills (comma-separated)</Label>
        <Textarea
          id="edit-skills"
          name="skills"
          placeholder="React, TypeScript, Node.js"
          value={formData.skills}
          onChange={handleInputChange}
          className="border-skill-gray focus:border-skill-blue min-h-[100px]"
        />
        <p className="text-xs text-muted-foreground">
          Separate each skill with a comma (e.g., "React, UI Design, JavaScript")
        </p>
      </div>
      
      {/* Domain */}
      <div className="space-y-2">
        <Label htmlFor="edit-domain">Interested Domain</Label>
        <Input
          id="edit-domain"
          name="domain"
          placeholder="Frontend Development"
          value={formData.domain}
          onChange={handleInputChange}
          className="border-skill-gray focus:border-skill-blue"
        />
      </div>
      
      {/* Projects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Projects</Label>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={addProject}
            className="text-skill-blue border-skill-blue hover:bg-skill-lightBlue"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Project
          </Button>
        </div>
        
        {projects.map((project, index) => (
          <div key={project.id} className="flex items-start gap-2">
            <Input
              placeholder={`Project ${index + 1} name`}
              value={project.name}
              onChange={(e) => handleProjectNameChange(project.id, e.target.value)}
              className="border-skill-gray focus:border-skill-blue"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeProject(project.id)}
              className="text-gray-500 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end gap-3 pt-4">
        <Button 
          type="button"
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={loading}
          className="bg-skill-blue hover:bg-skill-blue/90"
        >
          {loading ? 'Saving...' : (
            <span className="flex items-center">
              Save Changes <Save className="ml-2 h-4 w-4" />
            </span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default CandidateEditForm;
