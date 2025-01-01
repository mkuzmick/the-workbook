export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Main Content */}
      <div className="flex flex-grow items-center justify-center">
        <h1 className="text-7xl font-bold">The Workbook</h1>
      </div>

      {/* Footer */}
      <footer className="py-4 bg-gray-200 dark:bg-gray-800">
        <div className="flex justify-center gap-8">
          <a
            href="/editor"
            className="text-lg font-medium text-blue-600 hover:underline"
          >
            Editor
          </a>
          <a
            href="/tests"
            className="text-lg font-medium text-blue-600 hover:underline"
          >
            Tests
          </a>
        </div>
      </footer>
    </div>
  );
}
