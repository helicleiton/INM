import React from 'react';

const ClipboardUserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25v8.25A2.25 2.25 0 0118 21H6a2.25 2.25 0 01-2.25-2.25V16.5m12-8.25h-6.375a.375.375 0 01-.375-.375V3.375c0-.207.168-.375.375-.375h6.375a.375.375 0 01.375.375v4.5c0 .207-.168.375-.375.375z" />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M9 13.5h6m-6 3h4" />
  </svg>
);

export default ClipboardUserIcon;
