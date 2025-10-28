
import React from 'react';

const PrintIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}>
    <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6 3.125A2.25 2.25 0 0 1 8.25 1h7.5A2.25 2.25 0 0 1 18 3.125v10.584c0 .318-.035.633-.1.943m-1.243-1.026a42.415 42.415 0 0 0-10.56 0m10.56 0a42.415 42.415 0 0 1-10.56 0M18.75 14.25v5.25A2.25 2.25 0 0 1 16.5 21.75H7.5A2.25 2.25 0 0 1 5.25 19.5V14.25m13.5 0-4.286 4.286a.75.75 0 0 1-1.06 0l-4.286-4.286" 
    />
  </svg>
);

export default PrintIcon;
