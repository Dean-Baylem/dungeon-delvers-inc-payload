'use client';
import { CTA_TYPES } from '@/constants/ctaTypes';
import { AnimatePresence, motion } from 'motion/react';
import { useAuthStore } from '@/providers/auth-provider';
import { useState } from 'react';

type LoginFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginForm({ isOpen, onClose }: LoginFormProps) {
  const { primary, secondary } = CTA_TYPES;
  const { user, handleLogin } = useAuthStore((state) => state);
  const [error, setError] = useState<string | null>(null);

  const formRow = 'flex flex-col gap-2';
  const formLabel = 'font-serif font-semibold text-lg';
  const inputBase =
    'bg-white dark:bg-white p-2 border-mainText border-2 font-sans font-xl font-medium leading-relaxed';

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    try {
      const response = await handleLogin({ username, password }, 'players');
      onClose();
    } catch (error) {
      console.log('Login error:', error);
      setError('Login failed. Please check your login details and try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {user ? (
            <p className="font-subheading font-bold text-heading text-xl text-center">
              ALREADY LOGGED IN
            </p>
          ) : (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-30"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <form
                onSubmit={(e) => {
                  handleFormSubmit(e);
                }}
                className="p-6 bg-surface border-heading border-4 flex flex-col gap-4 w-[80vw] max-w-115"
              >
                <p className="font-subheading font-bold text-heading text-xl text-center">
                  Player Login
                </p>
                {error && <p className="text-red-500 text-center font-sans text-sm">{error}</p>}
                <div className={formRow}>
                  <label className={formLabel} htmlFor="username">
                    Username
                  </label>
                  <input type="text" name="username" id="username" className={inputBase} />
                </div>
                <div className={formRow}>
                  <label className={formLabel} htmlFor="password">
                    Password
                  </label>
                  <input type="password" name="password" id="password" className={inputBase} />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <button type="submit" className={primary}>
                    Submit
                  </button>
                  <button type="button" className={secondary} onClick={onClose}>
                    Close
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
