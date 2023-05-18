import { cloneElement, useState } from "react"
import { DialogTrigger } from "react-aria-components"
import Button from "./common/Button"
import Input from "./common/Input"
import Modal from "./common/Modal"

export interface AddModalProps {
  icon: React.ReactElement
  onCreate(name: string): void
  title: string
}

export function AddModal({ icon, onCreate, title }: AddModalProps) {
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string

    Promise.resolve(onCreate(name)).finally(() => setLoading(false))
  }

  return (
    <DialogTrigger>
      <Button size="lg">{title}</Button>

      <Modal size="sm">
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

            <div className="mt-5 flex flex-col gap-2 sm:mt-8 sm:flex-row-reverse">
              <Button
                variant="primary"
                className="w-full sm:ml-3 sm:w-auto"
                isLoading={loading}
                type="submit"
              >
                Create
              </Button>

              <Button
                className="w-full sm:w-auto"
                variant="secondary"
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
