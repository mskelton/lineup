import { Dialog, Modal as BaseModal } from "react-aria-components"

export interface ModalProps {
  children: ({ close }: { close: () => void }) => JSX.Element
}

export default function Modal({ children }: ModalProps) {
  return (
    <BaseModal className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 transition-opacity">
      <Dialog className="fixed inset-0 z-10 overflow-y-auto">
        {({ close }) => (
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              {children({ close })}
            </div>
          </div>
        )}
      </Dialog>
    </BaseModal>
  )
}
