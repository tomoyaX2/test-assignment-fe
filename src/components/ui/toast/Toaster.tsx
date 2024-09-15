import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./Toast";
import { useToast } from "./use-toast";

export function Toaster() {
  const { toasts } = useToast();
  console.log(toasts, "toasts");
  return (
    <ToastProvider>
      {toasts.map(({ id, title, icon, description, action, ...props }) => {
        return (
          <Toast key={id} {...props}>
            <div className="flex gap-3">
              {icon && (
                <div className="bg-secondary flex min-h-[32px] min-w-[32px] shrink-0 items-center justify-center self-start rounded">
                  {icon}
                </div>
              )}
              <div className="flex flex-col gap-0.5 self-center">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
