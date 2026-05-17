"use client"

import { useState } from "react"
import { MessageSquare, Send, User } from "lucide-react"

type Comment = {
  id: string
  author: string
  date: string
  content: string
}

export function ArticleComments() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Jan Kowalski",
      date: "Dzisiaj, 12:45",
      content: "Bardzo dobra inicjatywa. Oby więcej takich inwestycji w naszej gminie! Czekamy na dalsze informacje.",
    },
    {
      id: "2",
      author: "Anna_88",
      date: "Wczoraj, 19:20",
      content: "Czy wiadomo, czy w ramach projektu przewidziano dodatkowe udogodnienia dla najmłodszych mieszkańców?",
    }
  ])

  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return

    setIsSubmitting(true)
    
    // Simulate network request
    setTimeout(() => {
      const newComment: Comment = {
        id: Math.random().toString(36).substr(2, 9),
        author: name.trim(),
        date: "Przed chwilą",
        content: content.trim(),
      }
      setComments([newComment, ...comments])
      setName("")
      setContent("")
      setIsSubmitting(false)
    }, 600)
  }

  return (
    <section className="mt-16 pt-12 border-t border-slate-100">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--imperial-blue)]/5 border border-[var(--imperial-blue)]/10 text-[var(--imperial-blue)]">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-medium tracking-tight text-[var(--imperial-blue)]">Komentarze społeczności</h2>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mt-1">{comments.length} komentarzy</p>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100/50">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 text-[var(--imperial-blue)] font-bold text-xs uppercase">
                {comment.author.substring(0, 2)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-[var(--imperial-blue)]">{comment.author}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{comment.date}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}

          {comments.length === 0 && (
            <div className="py-12 text-center rounded-3xl border-2 border-dashed border-slate-100">
              <p className="text-sm font-medium text-slate-400">Brak komentarzy. Bądź pierwszą osobą, która podzieli się opinią!</p>
            </div>
          )}
        </div>

        {/* Comment Form */}
        <div className="lg:border-l border-slate-100 lg:pl-12">
          <div className="sticky top-32">
            <h3 className="font-serif text-lg font-medium text-[var(--imperial-blue)] mb-2">Dodaj komentarz</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
              Twój głos jest dla nas ważny. Podziel się swoją opinią na temat tego artykułu.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--imperial-blue)] mb-2 ml-1">
                  Imię i nazwisko (lub pseudonim)
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium text-[var(--imperial-blue)] outline-none transition-all focus:border-[var(--imperial-blue)] focus:ring-4 focus:ring-[var(--imperial-blue)]/5 disabled:opacity-50"
                    placeholder="Wpisz swoje imię..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="content" className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--imperial-blue)] mb-2 ml-1">
                  Treść komentarza
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  disabled={isSubmitting}
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-[var(--imperial-blue)] outline-none transition-all focus:border-[var(--imperial-blue)] focus:ring-4 focus:ring-[var(--imperial-blue)]/5 resize-none disabled:opacity-50"
                  placeholder="Napisz, co myślisz..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[var(--imperial-blue)] px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-[var(--gold)] hover:text-[var(--imperial-blue)] disabled:opacity-70 shadow-lg shadow-[var(--imperial-blue)]/10"
              >
                {isSubmitting ? "Wysyłanie..." : "Opublikuj komentarz"}
                {!isSubmitting && <Send className="h-3.5 w-3.5" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
