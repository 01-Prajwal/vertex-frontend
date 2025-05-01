import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function FeedList() {
    const { savedPosts =[],user ,savePost,removeSavedPost,updateActivities  } = useContext(AuthContext);
 // fallback to empty array

  const [redditPosts, setRedditPosts] = useState([]);
  const [xPosts, setXPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [localSavedPosts, setLocalSavedPosts] = useState([]);;
  const [searchTerm, setSearchTerm] = useState('');
  let toastQueue = [];
  let isToastShowing = false;
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Reddit fetch
        const redditResponse = await fetch(
          'https://www.reddit.com/r/technology/top.json?limit=5'
        );
        const redditData = await redditResponse.json();
        
        const posts = redditData.data.children.map((post) => ({
          id: post.data.id,
          title: post.data.title,
          url: `https://reddit.com${post.data.permalink}`,
          source: 'Reddit',
          timestamp: new Date(post.data.created_utc * 1000).toISOString(),
        }));
        
        setRedditPosts(posts);
    
 
        const twitterResponse = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/feed/twitter?q=web3`);
        const twitterData = await twitterResponse.json();
          
        if (twitterData && twitterData.data) {
          const twitterPosts = twitterData.data.map((tweet) => ({
            id: tweet.id,
            title: tweet.text,
            url: `https://twitter.com/i/web/status/${tweet.id}`,
            source: 'Twitter',
            timestamp: new Date().toISOString(), 
          }));
        
          setXPosts(twitterPosts);
        }
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Load saved posts from localStorage
    const saved = localSavedPosts
    setLocalSavedPosts(saved);
  }, []);
  const savePostInLocal = (post) => {
    savePost(post);
  };
  
  const interactWithFeed = async (type, post) => {
    if (!user) {
      showToast('You must be logged in to interact.', true);
      return;
    }
    console.log('type:', type, 'post:', post);

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/feed/interact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type }),
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.error || 'Interaction failed');
      }
    
      // 🟢 Record activity in new route
      await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/users/activity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type, // "save", "share", or "report"
          contentId: post?.id || post?.data?.id, // depending on structure (Twitter vs Reddit)
          contentType: (post?.source || "twitter").toLowerCase(),
          contentTitle: post?.title || post?.text || "Untitled", // fallback title
   
        }),
      });
      await updateActivities(); 
      // ✅ Local side-effects
      if (type === 'save') {
        savePostInLocal(post);
        showToast(`Post saved successfully! (+${data.creditsEarned} credits)`);
      } else if (type === 'report') {
        showToast(`Post reported. (+${data.creditsEarned} credits)`);
      } else if (type === 'share') {
        showToast(`Thanks for sharing! (+${data.creditsEarned} credits)`);
      }
    
    } catch (error) {
      console.error(error);
      showToast(`Failed to ${type} post`, true);
    }
  };    

  const handleRemoveSaved = (postId) => {
    removeSavedPost(postId);
    showToast('Post removed from saved items');
  };

  const handleSave = (post) => interactWithFeed('save', post);

  const handleReport = (postId,post) => interactWithFeed('report', post);
  
  const handleShare = async (post) => {
    try {
      await navigator.clipboard.writeText(post.url);
      await interactWithFeed('share', post);
      showToast('Link copied to clipboard!');

    } catch (err) {
      console.error('Failed to copy:', err);
      showToast('Failed to copy link', true);
    }
  };

  const showToast = (message, isError = false) => {
    // Add the toast message to the queue
    toastQueue.push({ message, isError });
  
    // If no toast is currently being displayed, start showing toasts from the queue
    if (!isToastShowing) {
      showNextToast();
    }
  };
  
  const showNextToast = () => {
    if (toastQueue.length === 0) {
      isToastShowing = false; // No more toasts to show
      return;
    }
  
    // Mark that a toast is being displayed
    isToastShowing = true;
  
    const { message, isError } = toastQueue.shift(); // Get the next toast from the queue
  
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${
      isError ? 'bg-red-500' : 'bg-green-500'
    } transition-opacity duration-500`;
    toast.textContent = message;
    document.body.appendChild(toast);
  
    // Hide the toast after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
        // After this toast disappears, show the next one from the queue
        showNextToast();
      }, 500); // Toast fade-out duration
    }, 1000); // Toast display duration
  };


  const renderPost = (post) => {
    const isSaved = Array.isArray(savedPosts) && savedPosts.some(savedPost => savedPost.id === post.id);

    
    return (
      <div
        key={post.id}
        className="border rounded-lg mb-4 bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
      >
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                post.source === 'Reddit' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
              }`}>
                {post.source}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(post.timestamp).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleReport(post.id,post)}
                className="p-1 text-gray-400 hover:text-red-500 rounded"
                title="Report"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </button>
            </div>
          </div>
          
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-blue-700 font-medium hover:text-blue-800"
          >
            {post.title.length > 120 ? `${post.title.substring(0, 120)}...` : post.title}
          </a>
        </div>
        
        <div className="bg-gray-50 px-4 py-2 flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              onClick={() => isSaved ? handleRemoveSaved(post.id) : handleSave(post)}
              className={`flex items-center space-x-1 text-sm ${
                isSaved ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
            
            <button
              onClick={() => handleShare(post)}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share</span>
            </button>
          </div>
          
          <a 
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline"
          >
            Visit
          </a>
        </div>
      </div>
    );
  };

  // Get filtered posts based on active tab and search
  const getFilteredPosts = () => {
    const allPosts = [...redditPosts, ...xPosts];
    
    let filteredPosts = allPosts;
    
    if (activeTab === 'reddit') {
      filteredPosts = redditPosts;
    } else if (activeTab === 'twitter') {
      filteredPosts = xPosts;
    } else if (activeTab === 'saved') {
      filteredPosts = savedPosts;
    }
    
    if (searchTerm.trim()) {
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filteredPosts;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading your feed...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
        <button 
          className="mt-2 text-sm font-medium text-red-600 hover:text-red-800"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    );
  }

  const filteredPosts = getFilteredPosts();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Feed</h1>
        <p className="text-gray-600">Stay updated with the latest posts from your favorite platforms</p>
      </div>
      
      {/* Search Bar */}
      <div className="mb-4 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search in feed..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === 'all'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === 'reddit'
              ? 'border-orange-500 text-orange-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('reddit')}
        >
          Reddit
        </button>
        <button
          className={`px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === 'twitter'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('twitter')}
        >
          Twitter
        </button>

      </div>
      
      {/* Feed Content */}
      <div className="space-y-1 h-[700px] overflow-y-auto">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(renderPost)
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No posts found</h3>
            <p className="mt-1 text-gray-500">
              {activeTab === 'saved' 
                ? 'You haven\'t saved any posts yet.' 
                : searchTerm 
                  ? 'Try adjusting your search term.' 
                  : 'Check back later for new content.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}