
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCandidates } from '@/context/CandidateContext';
import { Plus, Trash2, Send, Sparkles, Code, Briefcase } from 'lucide-react';

const CandidateForm = () => {
  const { addCandidate, loading } = useCandidates();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    domain: '',
  });
  
  const [projects, setProjects] = useState([{ id: '1', name: '' }]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    
    // Create candidate object
    const skillsArray = formData.skills
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill !== '');
    
    const candidateData = {
      name: formData.name,
      skills: skillsArray,
      projects: projects,
      domain: formData.domain,
    };
    
    try {
      await addCandidate(candidateData);
      // Redirect to dashboard on success
      navigate('/dashboard');
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 page-transition">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-skill-blue mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-skill-blue to-blue-600 bg-clip-text text-transparent">Create Your Profile</h1>
          </div>
          <p className="text-gray-600">Showcase your skills and projects to stand out to recruiters</p>
        </div>
        
        <div className="glass-card p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-skill-lightBlue rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-skill-charcoal font-medium">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                className="border-skill-gray focus:border-skill-blue shadow-sm"
              />
            </div>
            
            {/* Skills */}
            <div className="space-y-2">
              <Label htmlFor="skills" className="text-skill-charcoal font-medium flex items-center">
                <Code className="h-4 w-4 mr-2 text-skill-blue" />
                Skills (comma-separated)
              </Label>
              <Textarea
                id="skills"
                name="skills"
                placeholder="React, TypeScript, Node.js"
                value={formData.skills}
                onChange={handleInputChange}
                className="border-skill-gray focus:border-skill-blue min-h-[100px] shadow-sm"
              />
              <p className="text-xs text-muted-foreground">
                Separate each skill with a comma (e.g., "React, UI Design, JavaScript")
              </p>
            </div>
            
            {/* Domain */}
            <div className="space-y-2">
              <Label htmlFor="domain" className="text-skill-charcoal font-medium flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-skill-blue" />
                Interested Domain
              </Label>
              <Input
                id="domain"
                name="domain"
                placeholder="Frontend Development"
                value={formData.domain}
                onChange={handleInputChange}
                className="border-skill-gray focus:border-skill-blue shadow-sm"
              />
            </div>
            
            {/* Projects */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-skill-charcoal font-medium">Projects</Label>
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
                    className="border-skill-gray focus:border-skill-blue shadow-sm"
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
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-skill-blue to-blue-500 hover:from-skill-blue/90 hover:to-blue-500/90 shadow-md mt-4"
            >
              {loading ? 'Submitting...' : (
                <span className="flex items-center justify-center">
                  Submit Profile <Send className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CandidateForm;
