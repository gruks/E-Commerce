export function startPageTransition() {
  // Check if View Transitions are supported
  if (!document.startViewTransition) {
    console.log('View Transitions not supported');
    return false;
  }

  console.log('Starting view transition');

  return document.startViewTransition(() => {
    // This function will be called when the DOM is ready to transition
    console.log('View transition callback executed');
  });
}