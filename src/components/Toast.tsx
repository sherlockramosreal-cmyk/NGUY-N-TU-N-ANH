import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X, Loader2 } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'loading';

export interface ToastEvent {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export const toast = {
  show: (type: ToastType, message: string, duration?: number) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    const event = new CustomEvent<ToastEvent>('show-toast', { detail: { id, type, message, duration } });
    window.dispatchEvent(event);
    return id;
  },
  loading: (message: string) => toast.show('loading', message),
  success: (message: string) => toast.show('success', message, 4000),
  error: (message: string) => toast.show('error', message, 6000),
  info: (message: string) => toast.show('info', message, 4000),
  dismiss: (id: string) => {
    window.dispatchEvent(new CustomEvent('dismiss-toast', { detail: { id } }));
  }
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastEvent[]>([]);

  useEffect(() => {
    const handleShowToast = (e: Event) => {
      const customEvent = e as CustomEvent<ToastEvent>;
      const toastData = customEvent.detail;
      
      setToasts(prev => [...prev, toastData]);
      
      if (toastData.duration) {
          setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== toastData.id));
          }, toastData.duration);
      }
    };
    
    const handleDismissToast = (e: Event) => {
       const id = (e as CustomEvent).detail.id;
       setToasts(prev => prev.filter(t => t.id !== id));
    };

    window.addEventListener('show-toast', handleShowToast);
    window.addEventListener('dismiss-toast', handleDismissToast);
    return () => {
      window.removeEventListener('show-toast', handleShowToast);
      window.removeEventListener('dismiss-toast', handleDismissToast);
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`
            flex items-start gap-3 p-4 rounded-xl shadow-lg border max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-300
            ${toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800   ' : ''}
            ${toast.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800   ' : ''}
            ${toast.type === 'info' ? 'bg-blue-50 border-blue-200 text-blue-800   ' : ''}
            ${toast.type === 'loading' ? 'bg-white border-slate-200 text-slate-800   ' : ''}
          `}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 shrink-0 mt-0.5" />}
          {toast.type === 'loading' && <Loader2 className="w-5 h-5 shrink-0 mt-0.5 animate-spin text-zinc-600 dark:text-zinc-400" />}
          
          <div className="flex-1 text-sm font-medium leading-tight">{toast.message}</div>
          
          <button
            onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
            className="shrink-0 opacity-50 hover:opacity-100 transition mt-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
