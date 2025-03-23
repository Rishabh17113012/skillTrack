
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCandidates } from '@/context/CandidateContext';
import ProfileStrengthMeter from '@/components/ProfileStrengthMeter';
import { UserPlus, Briefcase, FileText, PenLine, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CandidateEditForm from '@/components/CandidateEditForm';

const Dashboard = () => {
  const { candidates, getCandidates, loading } = useCandidates();
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    // Force refresh the candidates data on component mount
    getCandidates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditClick = (candidateId: string) => {
    setSelectedCandidate(candidateId);
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedCandidate(null);
    // Refresh candidates after editing
    getCandidates();
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 page-transition">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-skill-charcoal mb-4">Candidate Dashboard</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            View all candidate profiles and their skill strengths
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse text-skill-blue">Loading profiles...</div>
          </div>
        ) : candidates.length === 0 ? (
          <div className="glass-card p-10 text-center">
            <div className="text-gray-500 mb-6">No candidate profiles found</div>
            <Button asChild className="bg-skill-blue hover:bg-skill-blue/90">
              <Link to="/candidate-form">
                <UserPlus className="mr-2 h-4 w-4" /> 
                Create Your Profile
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate) => (
              <div 
                key={candidate.id} 
                className="glass-card overflow-hidden slide-up-transition transition-all duration-300 hover:shadow-xl"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-skill-charcoal">
                      {candidate.name}
                    </h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-skill-blue hover:bg-skill-lightBlue/50"
                      onClick={() => handleEditClick(candidate.id)}
                    >
                      <PenLine className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FileText className="mr-2 h-4 w-4 text-skill-blue" />
                    {candidate.domain || "No domain specified"}
                  </div>
                  
                  <ProfileStrengthMeter 
                    strength={candidate.profileStrength} 
                    className="mb-6" 
                  />
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">Skills</div>
                    <div className="flex flex-wrap">
                      {candidate.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-2 flex items-center">
                      <Briefcase className="mr-2 h-4 w-4 text-skill-blue" />
                      Projects ({candidate.projects.length})
                    </div>
                    <ul className="space-y-1 text-sm">
                      {candidate.projects.map((project) => (
                        <li key={project.id} className="text-gray-600 pl-2 border-l-2 border-skill-lightBlue">
                          {project.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Candidate Profile</DialogTitle>
          </DialogHeader>
          {selectedCandidate && (
            <CandidateEditForm 
              candidateId={selectedCandidate} 
              onClose={handleCloseDialog} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
