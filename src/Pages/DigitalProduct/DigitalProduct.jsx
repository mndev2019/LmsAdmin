import React, { useState } from "react";
import TopHeader from "../../Layout/TopHeader";

const DigitalProduct = () => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState("document");

  const options = [
    { key: "document", label: "Document", desc: "Sell PDFs, notes" },
    { key: "video", label: "Video", desc: "Sell courses/videos" },
    { key: "link", label: "Link", desc: "Sell private links" },
  ];

  return (
    <>
     <TopHeader/>
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-8">
        {/* Step Header */}
        <div className="flex justify-between items-center mb-8">
          {["Content", "Details", "Pricing"].map((item, i) => (
            <div key={i} className="flex-1 text-center">
              <div
                className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full font-bold ${
                  step >= i + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </div>
              <p className="text-sm mt-2">{item}</p>
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">
              Choose Product Type
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {options.map((item) => (
                <div
                  key={item.key}
                  onClick={() => setType(item.key)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all hover:shadow-lg ${
                    type === item.key
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200"
                  }`}
                >
                  <h3 className="text-lg font-medium">{item.label}</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <input
                type="text"
                placeholder="Enter product title..."
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            {/* Dynamic */}
            <div className="mt-6">
              {type === "document" && (
                <div className="border-2 border-dashed p-6 rounded-xl text-center">
                  Upload Document
                  <input type="file" className="mt-3" />
                </div>
              )}

              {type === "video" && (
                <div className="border-2 border-dashed p-6 rounded-xl text-center">
                  Upload Video
                  <input type="file" accept="video/*" className="mt-3" />
                </div>
              )}

              {type === "link" && (
                <input
                  type="text"
                  placeholder="Paste your link here..."
                  className="w-full p-3 border rounded-xl"
                />
              )}
            </div>

            <button
              onClick={() => setStep(2)}
              className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Product Details</h2>

            <div className="border-2 border-dashed p-8 rounded-xl text-center">
              Upload Cover Image
              <input type="file" className="mt-4" />
            </div>

            <textarea
              placeholder="Write product description..."
              className="w-full mt-6 p-3 border rounded-xl h-32"
            ></textarea>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2 bg-gray-200 rounded-xl"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Pricing</h2>

            <label className="flex items-center gap-3 mb-4">
              <input type="checkbox" /> Paid Product
            </label>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Price"
                className="p-3 border rounded-xl"
              />
              <input
                type="number"
                placeholder="Discounted Price"
                className="p-3 border rounded-xl"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2 bg-gray-200 rounded-xl"
              >
                Back
              </button>
              <button className="px-6 py-2 bg-green-500 text-white rounded-xl">
                Publish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
   
  );
};

export default DigitalProduct;
