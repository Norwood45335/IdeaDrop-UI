//Makes QueryClient accessible in any route

import { HeadContent, Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { QueryClient } from '@tanstack/react-query'
import Header from '@/components/Header'
import { Home, Sparkles } from 'lucide-react'
import FloatingBrain from '@/components/FloatingBrain'

//passed object with head and component properties in earlier example

type RouterContext = {
  queryClient: QueryClient
}
export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'Share, explore and build on the best startup ideas and side hustles'
      },
      {
        title: 'IdeaDrop - Your Bright Idea Hub',
      },
    ]
  }),
  component: RootLayout,
  notFoundComponent: NotFound,
})

function RootLayout() {
  return (
    <div className='min-h-screen flex flex-col gradient-primary'>
      <HeadContent />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
    </div>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="glass-effect p-12 rounded-3xl shadow-magical max-w-md animate-bounce-in">
        <div className="mb-6">
          <FloatingBrain size="md" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-4 animate-sparkle">
          404
        </h1>
        <h2 className="text-2xl font-bold text-white mb-4">
          Idea Not Found!
        </h2>
        <p className="text-lg text-white/80 mb-8">
          Oops! Looks like this bright idea escaped into the digital void. Let's get you back to finding amazing ideas.
        </p>
        <Link 
          className='gradient-accent text-white font-bold px-8 py-4 rounded-full hover-lift hover-glow transition-all duration-300 shadow-magical inline-flex items-center space-x-2' 
          to='/'
        >
          <Home className="w-5 h-5" />
          <span>Back to Ideas</span>
          <Sparkles className="w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}
