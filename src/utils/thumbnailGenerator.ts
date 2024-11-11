const thumbnailCache = new Map<string, string>();

export const generateVideoThumbnail = async (videoUrl: string): Promise<string> => {
  // Check cache first
  if (thumbnailCache.has(videoUrl)) {
    return thumbnailCache.get(videoUrl)!;
  }


  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Load metadata first
    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    });

    // When the video is ready to play, capture the first frame
    video.addEventListener('loadeddata', () => {
      // Seek to 1 second or 25% of the video, whichever comes first
      video.currentTime = Math.min(1, video.duration * 0.25);
    });

    video.addEventListener('seeked', () => {
      // Draw the video frame on the canvas
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to base64 image
      try {
        const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.7);
        thumbnailCache.set(videoUrl, thumbnailUrl);
        resolve(thumbnailUrl);
      } catch (error) {
        reject(error);
      } finally {
        // Clean up
        video.remove();
        canvas.remove();
      }
    });

    // Handle errors
    video.addEventListener('error', (error) => {
      reject(error);
    });

    // Set video source and start loading
    video.src = videoUrl;
    video.load();
  });

}; 