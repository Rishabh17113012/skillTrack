
import React from 'react';
import { cn } from '@/lib/utils';

interface ProfileStrengthMeterProps {
  strength: number;
  maxStrength?: number;
  className?: string;
}

const ProfileStrengthMeter: React.FC<ProfileStrengthMeterProps> = ({
  strength,
  maxStrength = 10,
  className
}) => {
  // Calculate percentage (capped at 100%)
  const percentage = Math.min((strength / maxStrength) * 100, 100);
  
  // Determine color based on strength
  const getColor = () => {
    if (percentage < 30) return 'bg-red-500';
    if (percentage < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  // Determine label
  const getLabel = () => {
    if (percentage < 30) return 'Beginner';
    if (percentage < 70) return 'Intermediate';
    return 'Expert';
  };

  return (
    <div className={cn("space-y-2 w-full", className)}>
      <div className="flex justify-between text-sm">
        <span className="font-medium">Profile Strength</span>
        <div className="flex items-center space-x-1">
          <span className="font-semibold">{strength}</span>
          <span className="text-muted-foreground">/ {maxStrength}</span>
          <span className="ml-2 text-xs py-0.5 px-2 rounded-full bg-skill-lightBlue text-skill-blue font-medium">
            {getLabel()}
          </span>
        </div>
      </div>
      
      <div className="strength-meter-bg">
        <div 
          className={cn("strength-meter-fill", getColor())}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProfileStrengthMeter;
