export default function Contact() {
  return (
    <div className="text-center max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
        Связаться со мной
      </h2>
      <p className="text-slate-300 mb-6">
        Есть идея для проекта или просто хочешь поздороваться? Напиши мне! 👋
      </p>
      <a 
        href="mailto:hello@180sx.dev" 
        className="inline-block px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full transition"
      >
        ✉️ Написать письмо
      </a>
    </div>
  )
}