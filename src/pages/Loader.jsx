export function Loader() {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 bg-black opacity-50">
      <div class="flex-col gap-4 w-full flex items-center justify-center">
        <div
          class="w-20 h-20 border-4 border-transparent text-primary text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
        >
          <div
            class="w-16 h-16 border-4 border-transparent text-primary-second text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
          ></div>
        </div>
      </div>
    </div>
  )
}