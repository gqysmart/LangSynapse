import LangNote from "@/components/pages/Note/LangNoter"

export async function generateMetadata() {
  return {
    title: `📘 Note`,
  }
}

export type NotePageProps = {title: string}

export default function NotePage() {
  return (
    <section className="h-full">
      <h2 className="sr-only">Note</h2>
      <div className="h-full">
        <LangNote className="h-full"></LangNote>
      </div>
    </section>
  )
}
