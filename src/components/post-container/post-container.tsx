'use client'
import { useUsername } from "@/src/hooks/use-username";
import { DeleteIcon } from "../icons/delete-icon/delete-icon";
import { EditIcon } from "../icons/edit-icon/edit-icon";
import { Heading1 } from "../typography/heading/heading1";

type PostContainerProps = {
  username: string;
  title: string;
  content: string;
  createdAt: string;
}

export function PostContainer({ content, createdAt, title, username }: PostContainerProps) {
  const { username: currentUser } = useUsername();
  const isPostFromCurrentUser = currentUser === username;

  return (
    <div className="w-full rounded-2xl">
      <header className="flex items-center justify-between w-full h-17.5 bg-primary p-6 rounded-t-2xl">
        <div className="flex items-center w-[60%]">
          <Heading1 className="text-white truncate">{title}</Heading1>
        </div>
        {isPostFromCurrentUser && <div className="flex gap-6">
          <button aria-label="Deletar item" className="cursor-pointer">
            <DeleteIcon />
          </button>
          <button aria-label="Editar item" className="cursor-pointer">
            <EditIcon />
          </button>
        </div>}
      </header>

      <div className="flex flex-col border border-[#999999] border-t-0 p-6 rounded-b-2xl gap-4">
        <div className="flex w-full justify-between text-[#777777]">
          <p>@{username}</p>
          <p>{createdAt}</p>
        </div>
        <div>
          <p>{content}</p>
        </div>
      </div>
    </div>
  )
}