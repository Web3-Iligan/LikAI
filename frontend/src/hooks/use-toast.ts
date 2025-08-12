// Simple toast hook for now
export function useToast() {
  return {
    toasts: [], // Empty array to prevent map error
    toast: ({
      title,
      description,
    }: {
      title?: string;
      description?: string;
    }) => {
      console.log("Toast:", title, description);
      // You can implement a proper toast system later
      alert(`${title}: ${description}`);
    },
  };
}
