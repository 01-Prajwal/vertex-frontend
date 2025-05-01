import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export default function SavedFeedList() {
  const { savedPosts } = useContext(AuthContext);
  console.log(savedPosts);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Saved Feeds</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
      </div>
      <ul className="divide-y divide-gray-200">
        {savedPosts.length > 0 ? (
          savedPosts.map(feed => (
            <li key={feed.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{feed.title}</h3>
                  <p className="text-xs text-gray-500">
                    {feed.source} • {feed.date}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                  <button className="text-indigo-600 hover:text-indigo-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="px-6 py-4 text-sm text-gray-500">No saved feeds yet.</li>
        )}
      </ul>
      <div className="px-6 py-4 bg-gray-50">
        <button className="w-full text-center py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100">
          Load More
        </button>
      </div>
    </div>
  );
}
