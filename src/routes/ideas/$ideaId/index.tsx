//When using the Loader, data is ready on mount
//the query config can be defined in a type safe reusable way with queryOptions
//useSuspenseQuery will suspend the response until the component finishes loading
//TanStack Query offers caching and background fetching

import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery, useMutation } from '@tanstack/react-query'
import { fetchIdea, deleteIdea } from '@/api/ideas'
import { useAuth } from '@/context/AuthContext'

const ideaQueryOptions = (ideaId:string) => queryOptions({
  queryKey: ['idea', ideaId],
  queryFn: () => fetchIdea(ideaId)
}) 

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDetailsPage,
  loader: async ({params, context: {queryClient}}) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId))
  }
})

function IdeaDetailsPage() {
  const {ideaId} = Route.useParams()
  //the hook returns brad in the example
  const {data:idea} = useSuspenseQuery(ideaQueryOptions(ideaId))
  
  const navigate = useNavigate()

  const {user} = useAuth()

  const { mutateAsync:deleteMutate, isPending } = useMutation({
    mutationFn: () => deleteIdea(ideaId),
    onSuccess: () => {
      navigate({to: '/ideas'})
    }
  })

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this idea?')
    if(confirmDelete){
      await deleteMutate()
    }
  }
  
  return <div className='p-4'>
      <Link to='/ideas' className='text-blue-500 underline block mb-4'>
        ← Back To Ideas
      </Link>
      <h2 className="text-2xl font-bold">{idea.title}</h2>
      <p className="mt-2">{idea.description}</p>

      {user && user.id === idea.user && (
        <>
          {/* Edit link */}
          <Link to='/ideas/$ideaId/edit' params={{ideaId}} className='inline-block text-sm bg-yellow-500 hover:bg-yellow-600 text-white mt-4 mr-2 px-4 py-2 rounded transition'>
            Edit
          </Link>

          {/* delete button */}
          <button 
            onClick={handleDelete}
            disabled={isPending} 
            className="text-sm bg-red-600 hover:bg-red-700 text-white mt-4 px-4 py-2 rounded transition disabled:opacity:50">
            {isPending ? 'Deleting...' : 'Delete'}
          </button>
        </>
      )}


    </div>
}
