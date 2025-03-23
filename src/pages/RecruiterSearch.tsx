
import React, { useState } from 'react';
import { useCandidates } from '@/context/CandidateContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ProfileStrengthMeter from '@/components/ProfileStrengthMeter';
import { Search, Filter, Briefcase, FileText, Users, Mail } from 'lucide-react';
import ProxyContactForm from '@/components/ProxyContactForm';

const RecruiterSearch = () => {
  const { searchCandidatesBySkill, filteredCandidates, loading } = useCandidates();
  const [searchTerm, setSearchTerm] = useState('');
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<{id: string, name: string} | null>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchCandidatesBySkill(searchTerm);
  };
  
  const handleContactClick = (candidateId: string, candidateName: string) => {
    setSelectedCandidate({ id: candidateId, name: candidateName });
    setContactDialogOpen(true);
  };
  
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 page-transition">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-skill-charcoal mb-4">Find Talent</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Search and filter candidates by skills to find the perfect match for your team
          </p>
        </div>
        
        {/* Search Form */}
        <div className="glass-card p-6 md:p-8 mb-12">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by skill (e.g., React, Python, UI Design)"
                className="pl-10 border-skill-gray focus:border-skill-blue"
              />
            </div>
            <Button 
              type="submit" 
              className="bg-skill-blue hover:bg-skill-blue/90"
              disabled={loading}
            >
              <Filter className="mr-2 h-4 w-4" />
              {loading ? 'Searching...' : 'Filter Candidates'}
            </Button>
          </form>
        </div>
        
        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-skill-charcoal flex items-center">
              <Users className="mr-2 h-5 w-5 text-skill-blue" />
              Candidates ({filteredCandidates.length})
            </h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-pulse text-skill-blue">Searching for candidates...</div>
            </div>
          ) : filteredCandidates.length === 0 ? (
            <div className="glass-card p-10 text-center">
              <div className="text-gray-500">No candidates found matching your search criteria</div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredCandidates.map((candidate) => (
                <div 
                  key={candidate.id} 
                  className="glass-card overflow-hidden slide-up-transition transition-all duration-300 hover:shadow-lg"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-skill-charcoal">
                          {candidate.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <FileText className="mr-2 h-4 w-4 text-skill-blue" />
                          {candidate.domain || "No domain specified"}
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-4 md:w-1/3">
                        <ProfileStrengthMeter strength={candidate.profileStrength} />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
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
                    
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <Button 
                        variant="outline" 
                        className="text-skill-blue border-skill-blue hover:bg-skill-lightBlue"
                        onClick={() => handleContactClick(candidate.id, candidate.name)}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Candidate
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Contact Candidate</DialogTitle>
          </DialogHeader>
          {selectedCandidate && (
            <ProxyContactForm 
              candidateName={selectedCandidate.name} 
              onClose={() => setContactDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecruiterSearch;
