"use client";

import { useMemo, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Fredoka, Poppins, Nanum_Pen_Script } from "next/font/google";

import ClickSnowEffect from "@/components/ClickSnowEffect";
import ChristmasBackground from "@/components/ChristmasBackground";

// ✅ Card templates
import catCard from "@/assets/cat-card.jpeg";
import snowmanCard from "@/assets/snowman-card.jpeg";
import gooseCard from "@/assets/goose-card.jpeg";

// ✅ Cover templates
import catCover from "@/assets/cat-cover.jpeg";
import snowmanCover from "@/assets/snowman-cover.jpeg";

// ✅ Stamps + frame
import catStamp from "@/assets/cat-stamp.png";
import snowmanStamp from "@/assets/snowman-stamp.png";
import treeStamp from "@/assets/tree-stamp.png";
import stampFrame from "@/assets/square stamp frame.png";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const nanumPen = Nanum_Pen_Script({
  subsets: ["latin"],
  weight: "400",
});

type Props = {
  senderName: string;
  recipientName: string;
  message: string;
  selectedStamp: string;
  selectedCardTemplateId: string;
  selectedCoverTemplateId: string;
};

const CARD_BY_ID: Record<string, StaticImageData> = {
  "cat-card": catCard,
  "snowman-card": snowmanCard,
  "goose-card": gooseCard,
};

const COVER_BY_ID: Record<string, StaticImageData> = {
  "cat-cover": catCover,
  "snowman-cover": snowmanCover,
};

const STAMP_BY_ID: Record<string, StaticImageData> = {
  catStamp: catStamp,
  snowmanStamp: snowmanStamp,
  treeStamp: treeStamp,
};

/**
 * 🔧 Per-template message placement (tweak these values)
 * x,y,w,h are percentages of the card image area.
 */
const MESSAGE_PLACEMENT: Record<
  string,
  {
    x: number;
    y: number;
    w: number;
    h: number;
    align?: "left" | "center" | "right";
    color?: string;
  }
> = {
  // Cat: blank space on the right
  "cat-card": {
    x: 56,
    y: 16,
    w: 40,
    h: 68,
    align: "left",
    color: "#ffffff",
  },

  // Snowman: clean sky area (slightly higher + wider)
  "snowman-card": {
    x: 10,
    y: 10,
    w: 50,
    h: 66,
    align: "left",
    color: "#1b2a3a",
  },

  // Goose: centered-left, avoids goose neck
  "goose-card": {
    x: 16,
    y: 18,
    w: 50,
    h: 64,
    align: "left",
    color: "#761603",
  },
};

function safeMessage(msg: string) {
  const cleaned = (msg ?? "").trim();
  return cleaned.length ? cleaned : "Click to read your message ✨";
}

export default function ChristmasCardTemplate({
  senderName,
  recipientName,
  message,
  selectedStamp,
  selectedCardTemplateId,
  selectedCoverTemplateId,
}: Props) {
  const [stage, setStage] = useState<"closed" | "opening" | "open">("closed");
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const handleOpen = () => {
    if (stage !== "closed") return;
    setStage("opening");
    setTimeout(() => setStage("open"), 650);
  };

  const cardImg = useMemo(
    () => CARD_BY_ID[selectedCardTemplateId] ?? catCard,
    [selectedCardTemplateId]
  );

  const coverImg = useMemo(
    () => COVER_BY_ID[selectedCoverTemplateId] ?? catCover,
    [selectedCoverTemplateId]
  );

  const stampImg = useMemo(
    () => STAMP_BY_ID[selectedStamp] ?? catStamp,
    [selectedStamp]
  );

  const placement = useMemo(() => {
    return (
      MESSAGE_PLACEMENT[selectedCardTemplateId] ?? MESSAGE_PLACEMENT["cat-card"]
    );
  }, [selectedCardTemplateId]);

  return (
    <div
      className={`min-h-svh w-[100svw] bg-[#253D2C] relative overflow-hidden flex items-center justify-center p-4 ${poppins.className}`}
    >
      <ChristmasBackground />
      <ClickSnowEffect />

      {/* ===== Card (final state) ===== */}
      <div className="relative z-10 w-[92vw] max-w-[900px]">
        <div className="relative rounded-2xl bg-[#fff] shadow-2xl overflow-hidden">
          <div className="relative w-full aspect-[16/9] bg-[#f7f3f3]">
            <Image
              src={cardImg}
              alt="Selected Christmas card"
              fill
              className="object-cover"
              priority
            />

            {/* ✅ Message ON the card blank space (NO To/From here) */}
            <button
              type="button"
              onClick={() => setIsMessageOpen(true)}
              className="absolute rounded-xl focus:outline-none focus:ring-2 focus:ring-white/70"
              style={{
                left: `${placement.x}%`,
                top: `${placement.y}%`,
                width: `${placement.w}%`,
                height: `${placement.h}%`,
              }}
              aria-label="Open message"
            >
              <div
                className="w-full h-full p-3 md:p-5"
                style={{ textAlign: placement.align ?? "left" }}
              >
                <p
                  className={`${nanumPen.className} text-[18px] leading-snug md:text-[34px] md:leading-snug`}
                  style={{
                    color: placement.color ?? "#761603",
                    textShadow: "0 1px 0 rgba(255,255,255,0.55)",
                    whiteSpace: "pre-wrap",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical" as any,
                    WebkitLineClamp: 7 as any,
                  }}
                >
                  {safeMessage(message)}
                </p>

                <p className="mt-2 text-[11px] md:text-sm text-black/40">
                  Tap/click to zoom in
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ===== Envelope overlay (opening animation) ===== */}
<AnimatePresence>
  {stage !== "open" && (
    <motion.div
      className="absolute inset-0 z-20 flex items-center justify-center px-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="relative w-[92vw] max-w-[900px]">
        {/* Card peeking out */}
        <motion.div
          className="absolute left-0 right-0 mx-auto -top-2 w-full pointer-events-none"
          initial={{ y: 110 }} // was 140
          animate={{ y: stage === "opening" ? -40 : 110 }} // was -55 / 140
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
        >
          <div className="relative rounded-2xl bg-white shadow-xl overflow-hidden">
            <div className="relative w-full aspect-[16/9] bg-[#f7f3f3]">
              <Image
                src={cardImg}
                alt="Card preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Envelope */}
        <button
          type="button"
          onClick={handleOpen}
          className="relative w-full rounded-2xl bg-white shadow-2xl overflow-hidden"
        >
          {/* Cover image (shorter -> easier to see animation) */}
          <div className="relative w-full aspect-[16/7]">
            <Image src={coverImg} alt="Cover" fill className="object-cover" />
          </div>

          {/* Brown body (slightly shorter) */}
          <div className="relative bg-[#761603] px-6 py-5 md:px-10 md:py-6">
            {/* subtle inner border + glow */}
            <div className="absolute inset-3 rounded-xl border border-white/15 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.10),transparent_45%)] pointer-events-none" />

            {/* Stamp */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 w-20 h-20 md:w-24 md:h-24">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 rounded-lg bg-white/10 blur-[0.2px]" />
                <div className="absolute inset-0 p-1">
                  <Image
                    src={stampFrame}
                    alt="Stamp Frame"
                    className="w-full h-full object-contain absolute top-0 left-0 scale-110 opacity-95"
                  />
                  <Image
                    src={stampImg}
                    alt="Selected Stamp"
                    className="w-full h-full object-contain relative z-10"
                  />
                </div>
              </div>
            </div>

            {/* To/From LEFT aligned */}
            {/* To/From LEFT aligned */}
<div className="pr-28 md:pr-32 text-left space-y-3">
  {/* To row */}
  <div className="flex items-center gap-3">
  <span
    className={`text-white/70 text-xs md:text-sm ${poppins.className} mt-1`}
  >
    To
  </span>

  <span
    className={`${nanumPen.className} text-white leading-[0.95] ${
      (recipientName?.length ?? 0) > 15
        ? "text-4xl md:text-6xl"
        : "text-5xl md:text-7xl"
    }`}
  >
    {recipientName || "—"}
  </span>
</div>


  {/* From row */}
  <div className="flex items-center gap-3">
    <span
      className={`text-white/70 text-xs md:text-sm ${poppins.className}`}
    >
      From
    </span>
    <span
      className={`${nanumPen.className} text-white leading-[0.95] ${
        (senderName?.length ?? 0) > 15
          ? "text-3xl md:text-5xl"
          : "text-4xl md:text-6xl"
      }`}
    >
      {senderName || "—"}
    </span>
  </div>

  {/* Click hint */}
  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white/90 text-sm">
    <span className="animate-pulse">✨</span>
    <span className={poppins.className}>Click to open</span>
  </div>
</div>

          </div>

          {/* Flap (moved up a bit so it reads better) */}
          <motion.div
            className="absolute left-0 right-0 top-[52%] h-[48%] origin-top"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: stage === "opening" ? -120 : 0 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            <div className="w-full h-full bg-black/10" />
          </motion.div>
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>



      {/* ===== Message popup modal (scrollable + responsive) ===== */}
      <AnimatePresence>
        {isMessageOpen && (
          <motion.div
            className="fixed inset-0 z-[80] bg-black/60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMessageOpen(false)}
          >
            <motion.div
              className="
          w-full max-w-2xl rounded-2xl bg-white shadow-2xl
          max-h-[85svh] md:max-h-[80vh]
          overflow-hidden
        "
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky header */}
              <div className="sticky top-0 z-10 bg-white border-b border-black/10 px-6 py-4 md:px-8 md:py-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2
                      className={`text-xl md:text-2xl text-[#761603] ${fredoka.className}`}
                    >
                      Happy Holidays!
                    </h2>

                    {/* OPTIONAL: remove this if you don't want To/From here */}
                    <p className="text-sm text-gray-500 mt-1">
                      To{" "}
                      <span className="text-gray-700">
                        {recipientName || "—"}
                      </span>{" "}
                      • From{" "}
                      <span className="text-gray-700">{senderName || "—"}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsMessageOpen(false)}
                    className="text-2xl leading-none text-gray-400 hover:text-gray-600"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="px-6 pb-6 md:px-8 md:pb-8">
                <div className="mt-5 rounded-xl bg-[#fff7f7] p-4 md:p-6 max-h-[60svh] md:max-h-[55vh] overflow-y-auto">
                  <p
                    className={`whitespace-pre-wrap text-xl md:text-3xl text-[#761603] ${nanumPen.className}`}
                  >
                    {message?.trim() ? message : "—"}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
