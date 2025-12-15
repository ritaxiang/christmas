// components/CoverSelectionModal.tsx
import React from "react"
import Image, { StaticImageData } from "next/image"
import clsx from "clsx"

import catCover from "../assets/cat-cover.jpeg"
import snowmanCover from "../assets/snowman-cover.jpeg"

export type CoverTemplate = {
  id: string
  name: string
  src: StaticImageData | string
}

type CoverSelectionModalProps = {
  isOpen: boolean
  onClose: () => void
  onSelect: (template: CoverTemplate) => void
  selectedId?: string | null
}

const COVER_TEMPLATES: CoverTemplate[] = [
  { id: "cat-cover", name: "Cat Cover", src: catCover },
  { id: "snowman-cover", name: "Snowman Cover", src: snowmanCover },
]

const CoverSelectionModal: React.FC<CoverSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedId,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#761603]">
            Choose an envelope cover
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl leading-none text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {COVER_TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              type="button"
              onClick={() => {
                onSelect(tpl)
                onClose()
              }}
              className={clsx(
                "group relative flex flex-col rounded-xl border-2 p-2 transition hover:border-[#761603]/70 hover:shadow-md",
                selectedId === tpl.id
                  ? "border-[#761603] ring-2 ring-[#761603]/40"
                  : "border-transparent"
              )}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-[#f7f3f3]">
                <Image
                  src={tpl.src}
                  alt={tpl.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-[1.02]"
                />
              </div>
              <p className="mt-2 text-center text-sm font-medium text-gray-700">
                {tpl.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CoverSelectionModal
