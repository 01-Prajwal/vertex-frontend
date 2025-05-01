import { useState } from 'react';
import CreditCard from '../components/CreditCard';
import SavedFeedList from '../components/SavedFeedList';
import ActivityLog from '../components/ActivityLog';
import ProfileSummary from '../components/ProfileSummary';
import FeedList from '../components/FeedList';

export default function Dashboard() {
  // Mock user data (in a real app, this would come from context)

  // Mock data for components

  


  return (
    <div className="bg-gray-50 min-h-screen pt-16 pb-12">

      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area - 2/3 width on large screens */}
            <div className="lg:col-span-2 space-y-6">
              {/* Credit Card Component */}
            <CreditCard/>
              
              {/*  Feeds */}
              <FeedList/>
        
            </div>
            
            {/* Sidebar Area - 1/3 width on large screens */}
            <div className="space-y-6">
              {/* Profile Summary */}
              <ProfileSummary/>
              
              {/* Activity Log */}
              <ActivityLog/>

              <SavedFeedList/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}