import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { DialogTrigger } from "react-aria-components"
import Button from "./common/Button"
import Modal from "./common/Modal"

export interface DeleteModalProps {
  children: React.ReactNode
  onDelete(): void
  title: string
}

export default function DeleteModal({
  children,
  onDelete,
  title,
}: DeleteModalProps) {
  return (
    <DialogTrigger>
      <Button size="lg" variant="danger">
        {title}
      </Button>

      <Modal size="lg">
        {({ close }) => (
          <>
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationTriangleIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-red-600"
                />
              </div>

              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  {title}
                </h3>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">{children}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:mt-8 sm:flex-row-reverse">
              <Button
                className="w-full sm:ml-3 sm:w-auto"
                onPress={() => {
                  onDelete()
                  close()
                }}
                variant="danger"
              >
                Delete
              </Button>

              <Button
                autoFocus
                className="mt-3 w-full sm:mt-0 sm:w-auto"
                onPress={close}
                variant="secondary"
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </Modal>
    </DialogTrigger>
  )
}
