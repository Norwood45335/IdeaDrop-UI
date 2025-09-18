import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/register/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/register/login/"!</div>
}
