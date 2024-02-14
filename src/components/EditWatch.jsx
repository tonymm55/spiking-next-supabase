"use client";

import { updateWatch } from "@/app/server-actions/updateWatch";
import { useState } from "react";

export default function EditWatch({ watch }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    brand: watch.brand,
    model: watch.model,
    reference: watch.reference_number,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="mt-8">
      <div>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-md">
          Edit
        </button>
        {showModal && (
          <div
            className="fixed top-0 left-0 w-full h-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-md text-black">
              <span
                className="absolute top-0 right-0 mt-2 mr-2 hover:text-red-500 cursor-pointer"
                onClick={() => setShowModal(false)}>
                &times;
              </span>
              <form
                action={updateWatch}
                onSubmit={() => setShowModal(false)}
                className="flex flex-col space-y-4">
                <input type="hidden" name="id" value={watch.id} />
                <div>
                  <label htmlFor="brand">Brand</label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-blue-500"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="model">Model</label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-blue-500"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="reference">Reference</label>
                  <input
                    type="text"
                    id="reference"
                    name="reference"
                    value={formData.reference}
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-blue-500"
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                  Update Watch
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
