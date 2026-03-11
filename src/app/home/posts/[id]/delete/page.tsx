import { DeletePostModal } from "@/src/components/modals/delete-post-modal/delete-post-modal";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <div className="fixed inset-0 bg-[#777777] flex items-center justify-center">
       <DeletePostModal postId={Number(id)} />
    </div>
  );
}
