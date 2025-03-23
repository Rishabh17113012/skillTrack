
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Search, BarChart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen w-full page-transition">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-skill-lightBlue/30 to-white z-0"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-skill-charcoal slide-up-transition" style={{ animationDelay: '100ms' }}>
              Discover Talent. <span className="text-skill-blue">Track Skills.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto slide-up-transition" style={{ animationDelay: '200ms' }}>
              SkillTrack helps recruiters find the perfect candidates faster and allows candidates to showcase their capabilities effectively.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 slide-up-transition" style={{ animationDelay: '300ms' }}>
              <Button asChild size="lg" className="rounded-full px-8 bg-skill-blue hover:bg-skill-blue/90">
                <Link to="/candidate-form">For Candidates</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-skill-blue text-skill-blue hover:bg-skill-lightBlue">
                <Link to="/recruiter-search">For Recruiters</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-skill-charcoal">How SkillTrack Works</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="glass-card p-8 md:p-10 slide-up-transition" style={{ animationDelay: '100ms' }}>
              <div className="w-12 h-12 bg-skill-lightBlue rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-skill-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-skill-charcoal">Create Your Profile</h3>
              <p className="text-gray-600">
                Candidates can easily add their skills, project information, and areas of interest.
              </p>
              <Link to="/candidate-form" className="flex items-center mt-6 text-sm font-medium text-skill-blue">
                Start now <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            
            {/* Feature 2 */}
            <div className="glass-card p-8 md:p-10 slide-up-transition" style={{ animationDelay: '200ms' }}>
              <div className="w-12 h-12 bg-skill-lightBlue rounded-xl flex items-center justify-center mb-6">
                <BarChart className="w-6 h-6 text-skill-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-skill-charcoal">Track Your Strength</h3>
              <p className="text-gray-600">
                See how your profile ranks with our Profile Strength Meter and identify areas to improve.
              </p>
              <Link to="/dashboard" className="flex items-center mt-6 text-sm font-medium text-skill-blue">
                View dashboard <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            
            {/* Feature 3 */}
            <div className="glass-card p-8 md:p-10 slide-up-transition" style={{ animationDelay: '300ms' }}>
              <div className="w-12 h-12 bg-skill-lightBlue rounded-xl flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-skill-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-skill-charcoal">Find Talent Fast</h3>
              <p className="text-gray-600">
                Recruiters can search and filter candidates by skills to find the perfect match.
              </p>
              <Link to="/recruiter-search" className="flex items-center mt-6 text-sm font-medium text-skill-blue">
                Start searching <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-skill-softGray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-skill-charcoal mb-6">Ready to get started?</h2>
            <p className="text-lg text-gray-600 mb-10">
              Join SkillTrack today and connect with opportunities that match your skills.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 bg-skill-blue hover:bg-skill-blue/90">
              <Link to="/candidate-form">Create Your Profile</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
