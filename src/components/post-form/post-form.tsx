import { Button } from "../button/button";
import { InputField } from "../inputs/input-field/input-field";
import { TextareaField } from "../inputs/textarea-field/textarea-field";

export function PostForm() {
  return (
    <form>
      <InputField label="Title" id="title" placeholder="Hello world" />
      <TextareaField id="content" label="Content" placeholder="Content here" />
      <div className="flex flex-row justify-end w-full">
        <Button variant="primary" type="submit">Create</Button>
      </div>
    </form>
  )
}