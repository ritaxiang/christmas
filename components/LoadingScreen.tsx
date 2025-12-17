import { Fredoka } from "next/font/google"

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#253D2C] flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* subtle festive glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="w-[calc(90vw+6px)] md:max-w-[760px] h-[420px] md:h-[460px] bg-[#761603] rounded-2xl shadow-2xl flex flex-col items-center justify-center space-y-6 relative z-10">
        {/* spinner */}
        <div className="w-14 h-14 border-[5px] border-white/80 border-t-transparent rounded-full animate-spin" />

        {/* text */}
        <p
          className={`${fredoka.className} text-white text-xl md:text-2xl`}
        >
          Wrapping your Christmas card…
        </p>

        <p className="text-white/80 text-sm">
          Just a cozy moment...
        </p>
      </div>
    </div>
  )
}
