'use client';

import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Login() {
  const { data: session } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError(`Credentials error: ${result.error}`);
      console.error('Credentials sign-in error:', result.error);
    } else if (result?.ok) {
      window.location.href = '/app/home';
    } else {
      setError('Authentication failed');
      console.error('Credentials sign-in failed:', result);
    }
  };

  if (session) {
    window.location.href = '/app/home';
    return null;
  }

  return (
    <div className="fixed inset-0 bg-bg-dark/80 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, yoyo: Infinity }}
        className={cn(
          'bg-wizerd-darkestgrey/80 backdrop-blur-md rounded-lg p-6 max-w-xs sm:max-w-md w-full text-alien-green font-ubuntu',
          'bg-gradient-to-br from-gray-900 via-wizerd-darkestgrey to-gray-800',
          'shadow-[0_0_20px_var(--bitcoin-orange)] hover:shadow-[0_0_40px_var(--bitcoin-orange)] transition-shadow duration-300'
        )}
      >
        <h2 className="text-2xl sm:text-3xl text-center mb-6 font-bold">
          <span className="text-bitcoin-orange">₿itcoin</span>
          <span className="text-alien-green">Wizerd</span>{" "}
          <span className="text-wizerd-blue">Login</span>
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-wizerd-blue mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-bitcoin-orange"
              placeholder="Enter your username"
              title="Username"
            />
          </div>
          <div>
            <label className="block text-wizerd-blue mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-bitcoin-orange"
              placeholder="Enter your password"
              title="Password"
            />
          </div>
          <motion.button
            type="submit"
            className="w-full py-3 bg-bitcoin-orange text-white rounded-lg hover:bg-cyber-yellow hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </form>
        <div className="mt-6 text-center text-wizerd-blue">
          <p>Or sign in with:</p>
          <div className="flex flex-col gap-3 mt-3">
            <motion.button
              className="w-full py-2 bg-storm-grey text-bg-dark rounded-lg hover:bg-bitcoin-orange hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                console.log("Signing in with GitHub");
                signIn('github', { callbackUrl: '/app/home' }).catch((err) => console.error("GitHub sign-in error:", err));
              }}
            >
              Sign in with GitHub
            </motion.button>
            <motion.button
              className="w-full py-2 bg-storm-grey text-bg-dark rounded-lg hover:bg-bitcoin-orange hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                console.log("Signing in with Google");
                signIn('google', { callbackUrl: '/app/home' }).catch((err) => console.error("Google sign-in error:", err));
              }}
            >
              Sign in with Google
            </motion.button>
            <motion.button
              className="w-full py-2 bg-storm-grey text-bg-dark rounded-lg hover:bg-bitcoin-orange hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                console.log("Signing in with Twitter");
                signIn('twitter', { callbackUrl: '/app/home' }).catch((err) => console.error("Twitter sign-in error:", err));
              }}
            >
              Sign in with X (Twitter)
            </motion.button>
          </div>
          {/* New User? Register link with matching styling */}
          <div className="mt-4">
            <Link href="/register" className="text-wizerd-blue hover:text-bitcoin-orange transition-colors duration-300">
              New User? Register
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}