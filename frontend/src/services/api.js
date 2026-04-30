import axios from 'axios';

// Dummy data to use when backend is not available
export const dummyReviews = [
  {
    id: 1,
    repoName: 'facebook/react',
    prNumber: 28543,
    createdAt: '2023-10-27T10:00:00Z',
    issueType: 'Bug',
    severity: 'High',
    description: 'Potential memory leak in useEffect cleanup function.',
    fixCode: `useEffect(() => {
  const timer = setInterval(() => {
    // ...
  }, 1000);
  
  // FIX: Added cleanup function
  return () => clearInterval(timer);
}, []);`
  },
  {
    id: 2,
    repoName: 'vercel/next.js',
    prNumber: 56321,
    createdAt: '2023-10-26T14:30:00Z',
    issueType: 'Performance',
    severity: 'Medium',
    description: 'Avoid inline object creation to prevent unnecessary re-renders.',
    fixCode: `// Before
// <Component style={{ marginTop: 10 }} />

// After
const style = { marginTop: 10 };
// <Component style={style} />`
  },
  {
    id: 3,
    repoName: 'tailwindlabs/tailwindcss',
    prNumber: 12093,
    createdAt: '2023-10-25T09:15:00Z',
    issueType: 'Security',
    severity: 'High',
    description: 'XSS vulnerability in user input rendering.',
    fixCode: `// Use a sanitizer library before rendering HTML
import DOMPurify from 'dompurify';

const safeHTML = DOMPurify.sanitize(userInput);
<div dangerouslySetInnerHTML={{ __html: safeHTML }} />`
  },
  {
    id: 4,
    repoName: 'facebook/react',
    prNumber: 28410,
    createdAt: '2023-10-24T16:45:00Z',
    issueType: 'Code Style',
    severity: 'Low',
    description: 'Missing trailing comma in object literal.',
    fixCode: `const obj = {
  a: 1,
  b: 2, // Added comma here
};`
  }
];

const api = axios.create({
  // Base URL for the backend API
  // Change this to your actual backend URL when running the server
  baseURL: 'http://localhost:5000/api', 
});

export const getReviews = async () => {
  try {
    const response = await api.get('/reviews');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using dummy data.');
    return dummyReviews;
  }
};

export const getReviewById = async (id) => {
  try {
    const response = await api.get(`/reviews/${id}`);
    return response.data;
  } catch (error) {
    console.warn(`Backend not available for review ${id}, using dummy data.`);
    return dummyReviews.find(r => r.id === parseInt(id));
  }
};
