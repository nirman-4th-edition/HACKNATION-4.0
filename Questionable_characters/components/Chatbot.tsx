"use client"

import { useEffect } from "react"

const Chatbot = () => {
  useEffect(() => {
    const script1 = document.createElement("script")
    script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js"
    script1.async = true
    document.body.appendChild(script1)

    const script2 = document.createElement("script")
    script2.src = "https://files.bpcontent.cloud/2025/02/06/08/20250206080255-UWCM3S9F.js"
    script2.async = true
    document.body.appendChild(script2)

    return () => {
      if (document.body.contains(script1)) {
        document.body.removeChild(script1)
      }
      if (document.body.contains(script2)) {
        document.body.removeChild(script2)
      }
    }
  }, [])

  return null // This component doesn't render anything visible
}

export default Chatbot

