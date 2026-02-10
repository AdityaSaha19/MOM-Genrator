export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-6">MOM AI</h1>
      <p className="mb-6">Generate Professional Minutes of Meeting Automatically</p>

      <div className="flex gap-4">
        <a href="/login" className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold">
          Login
        </a>
        <a href="/register" className="bg-black px-6 py-2 rounded-lg font-semibold">
          Register
        </a>
      </div>
    </div>
  );
}
