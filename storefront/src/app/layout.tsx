import { Metadata } from "next"
import GlassProvider from "glass-js"
import "styles/globals.css"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <GlassProvider>
          <main className="relative">{props.children}</main>
        </GlassProvider>
      </body>
    </html>
  )
}
