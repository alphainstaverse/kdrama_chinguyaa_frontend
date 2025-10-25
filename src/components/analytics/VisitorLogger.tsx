// For future, if needed any custom API endpoint.

// // This file MUST start with "use client"
// "use client";
//
// import { useEffect } from 'react';
// import { usePathname } from 'next/navigation';
// import { BACKEND_URL } from '@/constants';
//
// // Helper function to get an ID from storage or create a new one
// function getOrSetId(key: string, storage: Storage): string {
//   let id = storage.getItem(key);
//   if (!id) {
//     id = crypto.randomUUID();
//     storage.setItem(key, id);
//   }
//   return id;
// }
//
// // Main function to log the visit
// async function logVisit(pathname: string) {
//   try {
//     // 1. Get client-side info
//     const visitorId = getOrSetId('my_visitor_id', localStorage);
//     const sessionId = getOrSetId('my_session_id', sessionStorage);
//     const userAgent = navigator.userAgent;
//
//     // Get the Directus URL from environment variables
//     const directusUrl = BACKEND_URL;
//     if (!directusUrl) {
//       console.warn('NEXT_PUBLIC_DIRECTUS_URL is not set.');
//       return;
//     }
//
//     // 2. Send to your Directus custom endpoint
//     const response = await fetch(`${directusUrl}/visitor_logs/log`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         visitor_id: visitorId,
//         session_id: sessionId,
//         user_agent: userAgent,
//         path: pathname, // Use the pathname from the hook
//       }),
//     });
//
//     if (!response.ok) {
//       console.warn('Failed to log analytics data.');
//     }
//   } catch (err) {
//     if (err instanceof Error) {
//       console.warn('Analytics logging failed:', err.message);
//     }
//   }
// }
//
// // This is the invisible component that will run the logic
// export default function VisitorLogger() {
//   const pathname = usePathname();
//
//   useEffect(() => {
//     // We check for 'window' to be extra safe
//     if (typeof window !== 'undefined') {
//       logVisit(pathname);
//     }
//   }, [pathname]); // This hook re-runs every time the page (pathname) changes
//
//   // This component renders nothing in the DOM
//   return null;
// }