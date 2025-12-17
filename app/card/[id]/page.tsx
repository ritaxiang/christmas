// app/card/[id]/page.tsx
"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { analytics, db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { logEvent } from "firebase/analytics"

import LoadingScreen from "@/components/LoadingScreen"
import ErrorScreen from "@/components/ErrorScreen"
import ChristmasCardTemplate from "@/components/ChristmasCardTemplate" // <- create this

type ChristmasCardDoc = {
  senderName: string
  recipientName: string
  message: string
  selectedStamp: string
  selectedCardTemplateId: string
  selectedCoverTemplateId: string
}

export default function CardPage() {
  const params = useParams()
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string)

  const [cardData, setCardData] = useState<ChristmasCardDoc | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        // ✅ IMPORTANT: christmasCards, not valentineMessages
        const docRef = doc(db, "christmasCards", id)
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
          setError("Card not found!")
          return
        }

        setCardData(docSnap.data() as ChristmasCardDoc)

        if (analytics) {
          logEvent(analytics, "christmas_card_viewed", { id })
        }
      } catch (err) {
        console.error(err)
        setError("Error fetching card")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <LoadingScreen />
  if (error) return <ErrorScreen message={error} />
  if (!cardData) return <ErrorScreen message="Card not found!" />

  return (
    <ChristmasCardTemplate
      senderName={cardData.senderName}
      recipientName={cardData.recipientName}
      message={cardData.message}
      selectedStamp={cardData.selectedStamp}
      selectedCardTemplateId={cardData.selectedCardTemplateId}
      selectedCoverTemplateId={cardData.selectedCoverTemplateId}
    />
  )
}
