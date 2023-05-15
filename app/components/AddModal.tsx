import { cloneElement } from "react"
import { DialogTrigger } from "react-aria-components"
import { Button } from "./common/Button"
import Input from "./common/Input"
import Modal from "./common/Modal"

export interface AddModalProps {
  icon: React.ReactElement
  onCreate(name: string): void
  title: string
}

export function AddModal({ icon, onCreate, title }: AddModalProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    onCreate(formData.get("name") as string)
  }

  return (
    <DialogTrigger>
      <Button size="lg">{title}</Button>

      <Modal>
        {({ close }) => (
          <form
            onSubmit={(e) => {
              handleSubmit(e)
              close()
            }}
          >
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                {cloneElement(icon, {
                  "aria-hidden": "true",
                  className: "h-6 w-6 text-blue-600",
                })}
              </div>

              <div className="mt-3 flex-1 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  {title}
                </h3>

                <div className="mt-2 sm:mt-4">
                  <Input
                    autoFocus
                    name="name"
                    label="Name"
                    type="text"
                    labelVisibility="hidden"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-8 sm:flex sm:flex-row-reverse">
              <Button
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                type="submit"
              >
                Create
              </Button>

              <Button
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onPress={close}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </DialogTrigger>
  )
}
