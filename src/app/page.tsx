import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Video, Shield, Zap, Globe } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-50 selection:bg-indigo-500/30">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto md:px-12">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600">
            <Video className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            ConnectHQ
          </span>
        </div>
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className="text-zinc-300 hover:text-white hover:bg-zinc-800"
          >
            Sign In
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 pt-24 pb-32 text-center max-w-5xl mx-auto md:pt-32 lg:pt-40">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm border rounded-full text-indigo-300 border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm">
          <span className="flex w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          Next-Gen Video Calling is Here
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          Connect with anyone, <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            anywhere in the world.
          </span>
        </h1>

        <p className="max-w-2xl mt-8 text-lg text-zinc-400 sm:text-xl">
          Crystal clear audio, high-definition video, and zero latency. Build
          meaningful connections with a platform designed for the modern web.
        </p>

        <div className="flex flex-col items-center gap-4 mt-10 sm:flex-row sm:gap-6">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="h-14 px-8 text-base font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-500 shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] transition-all hover:scale-105"
            >
              Get Started
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 text-base font-semibold rounded-full border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800 hover:text-white backdrop-blur-sm"
          >
            View Documentation
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-24 border-t border-zinc-800/50 bg-zinc-950/50 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col p-8 transition-colors border rounded-2xl border-zinc-800/50 bg-zinc-900/20 hover:bg-zinc-900/40">
              <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-zinc-100">
                Ultra Low Latency
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Experience real-time conversations without the awkward pauses.
                Our optimized WebRTC infrastructure ensures instant delivery.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col p-8 transition-colors border rounded-2xl border-zinc-800/50 bg-zinc-900/20 hover:bg-zinc-900/40">
              <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-lg bg-purple-500/10 text-purple-400">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-zinc-100">
                End-to-End Secure
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Your calls are your business. Every stream is heavily encrypted
                so you can communicate with total peace of mind.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col p-8 transition-colors border rounded-2xl border-zinc-800/50 bg-zinc-900/20 hover:bg-zinc-900/40">
              <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-lg bg-blue-500/10 text-blue-400">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-zinc-100">
                Works Everywhere
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Fully responsive and compatible with all modern browsers and
                devices. No downloads required for your participants.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
