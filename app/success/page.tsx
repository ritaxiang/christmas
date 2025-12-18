"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { IoCopy } from "react-icons/io5"
import { MdHome } from "react-icons/md"
import toast, { Toaster } from "react-hot-toast"
import { Fredoka, Poppins } from "next/font/google"
import ChristmasBackground from "@/components/ChristmasBackground"
import ClickSnowEffect from "@/components/ClickSnowEffect"

const fredoka = Fredoka({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
const poppins = Poppins({ subsets: ["latin"], weight: ["400"] })

function Inner() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const [cardUrl, setCardUrl] = useState("")

  useEffect(() => {
    if (id) setCardUrl(`${window.location.origin}/card/${id}`)
  }, [id])

  const copy = async () => {
    if (!cardUrl) return
    await navigator.clipboard.writeText(cardUrl)
    toast.success("Link copied!", {
      style: { background: "#fff", color: "#761603", fontFamily: fredoka.style.fontFamily },
    })
  }

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto px-4 pt-24 text-center">
      <h1 className={`text-5xl md:text-7xl text-[#fde9de] ${fredoka.className}`}>
        {id ? "Your card is ready!" : "Missing id"}
      </h1>

      <p className={`mt-4 text-lg md:text-2xl text-white/80 ${poppins.className}`}>
        {id
          ? "Share this link with your friend 🎄"
          : "Go back and generate a card again."}
      </p>

      {id ? (
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white/95 px-5 py-4 flex items-center justify-between gap-3">
            <Link
              href={cardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-[#761603] hover:underline"
            >
              {cardUrl}
            </Link>

            <button
              onClick={copy}
              className="shrink-0 rounded-xl bg-[#761603] px-3 py-2 text-white hover:bg-[#922b17] transition"
              aria-label="Copy link"
            >
              <IoCopy size={18} />
            </button>
          </div>

          <Link
            href={cardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full bg-[#761603] px-8 py-4 text-white text-xl hover:bg-[#922b17] transition ${fredoka.className}`}
          >
            Open Card
          </Link>
        </div>
      ) : (
        <Link
          href="/form"
          className={`inline-block mt-8 rounded-full bg-[#761603] px-8 py-4 text-white text-xl hover:bg-[#922b17] transition ${fredoka.className}`}
        >
          Back to form
        </Link>
      )}
    </div>
  )
}

export default function SuccessPage() {
  return (
    <div className="min-h-svh relative bg-[#253D2C] overflow-hidden">
      <Toaster position="bottom-center" />
      <ChristmasBackground />
      <ClickSnowEffect />

      <Link
        href="/"
        className="absolute top-5 left-5 z-20 text-white/80 hover:text-white transition-colors"
      >
        <MdHome className="w-9 h-9" />
      </Link>

      <Suspense fallback={<div className={`p-10 text-white ${poppins.className}`}>Loading…</div>}>
        <Inner />
      </Suspense>
    </div>
  )
}
