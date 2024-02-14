import { addWatch } from "@/app/server-actions/addWatch";

export default function WatchForm() {
  return (
    <form
      action={addWatch}
      class="bg-slate-500 text-black min-h-screen flex flex-col justify-center items-center gap-4">
      <div class="flex flex-col w-full max-w-md p-4 bg-white rounded-md shadow-md">
        <h2 class="text-xl font-bold text-center mb-4">Add New Watch</h2>
        <div class="flex flex-col gap-2">
          <div class="flex items-center">
            <label for="brand" class="w-1/4 text-right mr-2">
              Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              class="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500"
              required
            />
          </div>
          <div class="flex items-center">
            <label for="model" class="w-1/4 text-right mr-2">
              Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              class="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500"
              required
            />
          </div>
          <div class="flex items-center">
            <label for="referenceNumber" class="w-1/4 text-right mr-2">
              Reference
            </label>
            <input
              type="text"
              id="referenceNumber"
              name="referenceNumber"
              class="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-bold mt-4">
          Add Watch
        </button>
      </div>
    </form>
  );
}
