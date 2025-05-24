import LangNote from "@/components/pages/Note/LangNoter"

export async function generateMetadata() {
  return {
    title: `📘 Note`,
  }
}

export type NotePageProps = {title: string}

export default function NotePage() {
  return (
    <section className="relative max-w-2xl mx-auto pb-20">
      <h2 className="sr-only">Note</h2>
      <div className="relative w-full h-screen">
        <LangNote></LangNote>
      </div>
    </section>
  )
}
