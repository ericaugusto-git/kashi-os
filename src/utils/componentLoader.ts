import { lazy } from 'react';

export const loadComponent = (componentPath: string) => {
  // Remove the @ prefix and handle the path properly
  const normalizedPath = componentPath.replace('@/', '../');
  
  return lazy(() => {
    // Using dynamic import with proper path resolution
    return import("../Folder/Folder.tsx")
      .then(module => ({ default: module.default }))
      .catch(error => {
        console.error(`Error loading component ${componentPath}:`, error);
        throw error;
      });
  });
}; 