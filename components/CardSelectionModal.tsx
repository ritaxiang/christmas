// components/CardSelectionModal.tsx
import React from "react"
import Image, { StaticImageData } from "next/image"
import clsx from "clsx"

import catCard from "../assets/cat-card.jpeg"
import snowmanCard from "../assets/snowman-card.jpeg"
import gooseCard from "../assets/goose-card.jpeg"

export type CardTemplate = {
  id: string
  name: string
  src: StaticImageData
}

type CardSelectionModalProps = {
  isOpen: boolean
  onClose: () => void
  onSelect: (template: CardTemplate) => void
  selectedId?: string | null
}

const CARD_TEMPLATES: CardTemplate[] = [
  { id: "cat-card", name: "Cat Card", src: catCard },
  { id: "snowman-card", name: "Snowman Card", src: snowmanCard },
  { id: "goose-card", name: "Goose Card", src: gooseCard },
]

const CardSelectionModal: React.FC<CardSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedId,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-3">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#761603]">
            Choose a Christmas card template
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl leading-none text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {/* allow scrolling if the grid gets tall on mobile */}
        <div className="overflow-y-auto max-h-[75vh] pr-1">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {CARD_TEMPLATES.map((tpl) => {
              const aspectRatio = `${tpl.src.width} / ${tpl.src.height}`

              return (
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
                  {/* ✅ dynamic frame that matches each card */}
                  <div
                    className="relative w-full overflow-hidden rounded-lg bg-[#f7f3f3]"
                    style={{ aspectRatio }}
                  >
                    <Image
                      src={tpl.src}
                      alt={tpl.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                    />
                  </div>

                  <p className="mt-2 text-center text-sm font-medium text-gray-700">
                    {tpl.name}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardSelectionModal
