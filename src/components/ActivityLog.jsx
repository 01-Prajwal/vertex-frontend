import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ActivityLog() {
  const { activities, updateActivities } = useContext(AuthContext);

  useEffect(() => {
    updateActivities(); // Load on mount
  }, []);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden h-[410px] overflow-y-auto">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
      </div>
      <ul className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <li key={activity.id} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {activity.type === "share" && (
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                  </div>
                )}
                {activity.type === "save" && (
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                {activity.type === "report" && (
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-900">{activity.content}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
