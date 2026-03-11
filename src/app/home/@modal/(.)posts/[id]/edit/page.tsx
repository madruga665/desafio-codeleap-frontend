import { EditPostModal } from "@/src/components/modals/edit-post-modal/edit-post-modal";
import { postsService } from "@/src/services/posts.service";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await postsService.getPostById(Number(id));

  if (!post) {
    notFound();
  }

  return (
    <EditPostModal
      postId={post.id}
      initialValues={{
        title: post.title,
        content: post.content,
      }}
    />
  );
}
