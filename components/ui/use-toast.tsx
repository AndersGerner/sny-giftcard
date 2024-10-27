import { toast } from "sonner";

export interface Toast {
  title?: string;
  description?: string;
  duration?: number;
}

export function useToast() {
  return {
    toast: (options: Toast) => {
      toast(options.title, {
        description: options.description,
        duration: options.duration || 3000,
      });
    },
  };
}