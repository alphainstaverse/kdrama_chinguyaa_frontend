// src/utils/styles.ts

export const getTagClasses = (category: string): string => {

  // These are the base styles all tags will share
  const baseClasses = "text-xs uppercase font-semibold px-2.5 py-0.5 rounded-full";

  // We use toUpperCase() to make sure the comparison is consistent
  switch (category.toUpperCase()) {
    case 'NEWS':
      return `${baseClasses} bg-blue-100 text-blue-800`;
    case 'CASTING':
      return `${baseClasses} bg-purple-100 text-purple-800`;
    case 'RANKING':
      return `${baseClasses} bg-green-100 text-green-800`;
    case 'OP-ED':
      return `${baseClasses} bg-yellow-100 text-yellow-800`;

    // Add more cases here for other categories...

    default:
      // A fallback style for any category not listed
      return `${baseClasses} bg-gray-100 text-gray-800`;
  }
};