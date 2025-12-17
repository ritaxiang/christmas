"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MdHome } from "react-icons/md";

import { Fredoka, Poppins } from "next/font/google";
import catStamp from "../../assets/cat-stamp.png";
import snowmanStamp from "../../assets/snowman-stamp.png";
import treeStamp from "../../assets/tree-stamp.png";
import stampFrame from "../../assets/square stamp frame.png";
import placeholder from "../../assets/placeholder2.jpg";

import ClickSnowEffect from "@/components/ClickSnowEffect";
import ChristmasBackground from "@/components/ChristmasBackground";

import CardSelectionModal, {
  CardTemplate,
} from "@/components/CardSelectionModal";
import CoverSelectionModal, {
  CoverTemplate,
} from "@/components/CoverSelectionModal";

import { logEvent } from "firebase/analytics";
import { analytics } from "@/lib/firebase";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const formSchema = z.object({
  senderName: z.string().min(1, "Your name is required"),
  recipientName: z.string().min(1, "Recipient name is required"),
  message: z.string().min(1, "Message is required"),

  selectedCardTemplateId: z.string().min(1, "Please choose a card template"),
  selectedCoverTemplateId: z.string().min(1, "Please choose an envelope cover"),

  selectedStamp: z.string().min(1, "Please select a stamp"),
});

export default function ValentineForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senderName: "",
      recipientName: "",
      message: "",
      selectedCardTemplateId: "",
      selectedCoverTemplateId: "",
      selectedStamp: "",
    },
  });

  const [selectedStamp, setSelectedStamp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [selectedCoverId, setSelectedCoverId] = useState<string | null>(null);

  // previews are just for UI display on the form
  const [previewCardSrc, setPreviewCardSrc] = useState<string | null>(null);
  const [previewCoverSrc, setPreviewCoverSrc] = useState<string | null>(null);

  const stamps = [
    { id: "catStamp", src: catStamp, alt: "Christmas Cat" },
    { id: "snowmanStamp", src: snowmanStamp, alt: "Snowman" },
    { id: "treeStamp", src: treeStamp, alt: "Tree" },
  ];

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    if (analytics) {
      logEvent(analytics, "form_submitted_start", { button_name: "submit" });
    }

    try {
      // Save to Firestore
      const docRef = await addDoc(collection(db, "christmasCards"), {
        senderName: values.senderName,
        recipientName: values.recipientName,
        message: values.message,

        selectedStamp: values.selectedStamp,
        selectedCardTemplateId: values.selectedCardTemplateId,
        selectedCoverTemplateId: values.selectedCoverTemplateId,

        createdAt: new Date(),
      });

      if (analytics) {
        logEvent(analytics, "form_submitted_successful", {
          button_name: "submit",
        });
      }

      form.reset();
      setPreviewCardSrc(null);
      setPreviewCoverSrc(null);
      setSelectedCardId(null);
      setSelectedCoverId(null);
      setSelectedStamp(null);

      // after addDoc succeeds
      router.push(`/success?id=${docRef.id}`)

    } catch (error: any) {
      console.error("Error saving christmas card:", {
        code: error?.code,
        message: error?.message,
        name: error?.name,
        error,
      });
    
      alert(
        `Error saving card: ${error?.code ?? "unknown"}\n${error?.message ?? ""}`
      );
    } finally {
      setLoading(false);
    }
    
  }

  return (
    <div
      className={`min-h-svh flex items-center justify-center bg-[#253D2C] ${poppins.className}`}
    >
      <ChristmasBackground />
      <ClickSnowEffect />

      <Link
        href="/"
        className="absolute top-5 left-5 z-20 text-[#FFFAFA] hover:text-[#922b17] transition-colors"
      >
        <MdHome className="w-[4svh] h-[4svh] md:w-[40px] md:h-[40px]" />
      </Link>

      <div className="container mx-auto px-4 max-w-4xl pt-20 md:pt-0 z-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left - Names/Message + Stamp */}
              <div className="flex-1 bg-[#761603] rounded-xl p-6 space-y-4">
                <FormField
                  control={form.control}
                  name="senderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="From: "
                          {...field}
                          className="bg-white rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recipientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="To: "
                          {...field}
                          className="bg-white rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Message"
                          className="min-h-[200px] bg-white rounded-xl resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Stamp Selection */}
                <div className="space-y-2">
                  <h3
                    className={`text-white text-xl font-semibold ${fredoka.className}`}
                  >
                    Select Stamp
                  </h3>

                  <FormField
                    control={form.control}
                    name="selectedStamp"
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <div className="flex gap-4 justify-center">
                            {stamps.map((stamp) => (
                              <button
                                key={stamp.id}
                                type="button"
                                onClick={() => {
                                  setSelectedStamp(stamp.id);
                                  form.setValue("selectedStamp", stamp.id, {
                                    shouldValidate: true,
                                  });
                                }}
                                className={`
                                  w-24 h-24 rounded-lg p-1 transition-all relative
                                  ${
                                    selectedStamp === stamp.id
                                      ? "bg-white"
                                      : "bg-[#f9f4e3] hover:drop-shadow-lg"
                                  }
                                `}
                              >
                                <Image
                                  src={stampFrame}
                                  alt="Stamp Frame"
                                  className={`
                                    w-full h-full object-contain absolute top-0 left-0 scale-110
                                    ${
                                      selectedStamp === stamp.id
                                        ? "brightness-[90%] saturate-[60%] contrast-[120%] invert-[15%] hue-rotate-[50deg]"
                                        : ""
                                    }
                                  `}
                                />
                                <Image
                                  src={stamp.src}
                                  alt={stamp.alt}
                                  className="w-full h-full object-contain relative z-10"
                                />
                              </button>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage className="text-center text-[#ff0000]" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Right - Card/Cover selection */}
              <div className="flex-1 bg-[#761603] rounded-xl p-6">
                <div className="flex flex-col gap-6">
                  {/* Card */}
                  <FormField
                    control={form.control}
                    name="selectedCardTemplateId"
                    render={() => (
                      <div className="bg-white p-4 rounded-lg shadow-md w-full">
                        <FormItem className="bg-[#D9D9D9] w-full aspect-video rounded-md relative overflow-hidden">
                          <div className="w-full h-full relative">
                            <Image
                              src={placeholder}
                              alt="Card Background"
                              fill
                              className="object-cover"
                            />

                            <button
                              type="button"
                              onClick={() => setIsCardModalOpen(true)}
                              className="absolute inset-0 z-10 flex items-center justify-center"
                            >
                              {previewCardSrc ? (
                                <img
                                  src={previewCardSrc}
                                  alt="Selected card"
                                  className="h-full w-full object-cover"
                                />
                              ) : null}
                            </button>
                          </div>
                          <FormMessage />
                        </FormItem>

                        <div className="mt-3 flex items-center justify-center">
                          <span className="text-gray-400 text-sm text-center">
                            {previewCardSrc
                              ? "Click to change!!"
                              : "Choose Card Template"}
                          </span>
                        </div>
                      </div>
                    )}
                  />

                  {/* Cover */}
                  <FormField
                    control={form.control}
                    name="selectedCoverTemplateId"
                    render={() => (
                      <div className="bg-white p-4 rounded-lg shadow-md w-full">
                        <FormItem className="bg-[#D9D9D9] w-full aspect-video rounded-md relative overflow-hidden">
                          <div className="w-full h-full relative">
                            <Image
                              src={placeholder}
                              alt="Envelope Background"
                              fill
                              className="object-cover"
                            />

                            <button
                              type="button"
                              onClick={() => setIsCoverModalOpen(true)}
                              className="absolute inset-0 z-10 flex items-center justify-center"
                            >
                              {previewCoverSrc ? (
                                <img
                                  src={previewCoverSrc}
                                  alt="Selected cover"
                                  className="h-full w-full object-cover"
                                />
                              ) : null}
                            </button>
                          </div>
                          <FormMessage />
                        </FormItem>

                        <div className="mt-3 flex items-center justify-center">
                          <span className="text-gray-400 text-sm text-center">
                            {previewCoverSrc
                              ? "Click to change!!"
                              : "Choose Envelope Cover"}
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center pb-6 md:pb-0">
              <Button
                type="submit"
                className={`bg-[#761603] hover:bg-[#922b17] text-white text-xl px-8 py-2 rounded-3xl h-[60px] ${fredoka.className}`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Generate Card"}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Modals */}
      <CardSelectionModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        selectedId={selectedCardId}
        onSelect={(template: CardTemplate) => {
          setSelectedCardId(template.id)
        
          // preview still uses src
          const src = typeof template.src === "string" ? template.src : template.src.src
          setPreviewCardSrc(src)
        
          // BUT store the ID in the form (not src)
          form.setValue("selectedCardTemplateId", template.id, { shouldValidate: true })
        }}
        
      />

      <CoverSelectionModal
        isOpen={isCoverModalOpen}
        onClose={() => setIsCoverModalOpen(false)}
        selectedId={selectedCoverId}
        onSelect={(template: CoverTemplate) => {
          setSelectedCoverId(template.id)
        
          const src = typeof template.src === "string" ? template.src : template.src.src
          setPreviewCoverSrc(src)
        
          form.setValue("selectedCoverTemplateId", template.id, { shouldValidate: true })
        }}
        
      />
    </div>
  );
}
