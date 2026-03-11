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
    <div className="fixed inset-0 bg-[#777777] flex items-center justify-center">
      <EditPostModal
        postId={post.id}
        initialValues={{
          title: post.title,
          content: post.content,
        }}
      />
    </div>
  );
}
