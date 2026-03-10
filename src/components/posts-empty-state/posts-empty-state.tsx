import { Heading1 } from "../typography/heading/heading1";

export function PostsEmptyState() {
  return (
    <div className="flex w-full justify-center">
      <Heading1>No posts at the moment. 😢</Heading1>
    </div>
  )
}