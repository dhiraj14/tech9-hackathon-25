export const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatScore = (score: number): string => {
  // Only show results for negative scores (good matches)
  // Negative scores closer to 0 are better matches
  if (score >= 0) {
    return 'Poor match';
  }
  
  // Convert negative score to percentage (closer to 0 = higher percentage)
  // -0.1 becomes ~90%, -0.5 becomes ~50%, -1.0 becomes 0%
  const percentage = Math.max(0, (1 + score) * 100);
  return percentage.toFixed(1) + '%';
};

export const getScoreColor = (score: number): string => {
  // Only show good colors for negative scores (actual matches)
  if (score >= 0) {
    return 'text-gray-500';
  }
  
  // For negative scores, closer to 0 is better
  const percentage = Math.max(0, (1 + score) * 100);
  if (percentage > 70) return 'text-green-600';
  if (percentage > 50) return 'text-yellow-600';
  return 'text-red-600';
};
