"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  contact: z
    .string()
    .min(7, "Contact is required")
    .regex(/^\d{7,15}$/g, "Contact must be a number with 7-15 digits"),
  email_id: z.string().email("Invalid email"),
  image: z
    .custom<File | FileList>(
      (v) => v instanceof File || v instanceof FileList,
      "Image is required"
    )
    .refine((val) => {
      if (val instanceof File) return val.size > 0;
      if (val instanceof FileList) return val.length > 0 && val[0].size > 0;
      return false;
    }, "Image is required"),
});

type FormDataType = z.infer<typeof schema>;

export default function AddSchoolPage() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataType>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormDataType) => {
    try {
      setSubmitting(true);
      const body = new FormData();
      body.append("name", data.name);
      body.append("address", data.address);
      body.append("city", data.city);
      body.append("state", data.state);
      body.append("contact", data.contact);
      body.append("email_id", data.email_id);
      const file =
        data.image instanceof File ? data.image : (data.image as FileList)[0];
      body.append("image", file);

      const res = await fetch("/api/schools", {
        method: "POST",
        body,
      });
      if (!res.ok) {
        const j: { message?: string } = await res
          .json()
          .catch(() => ({} as { message?: string }));
        throw new Error(j.message || "Failed to add school");
      }
      reset();
      alert("School added successfully");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to submit";
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tracking-wide">
          ➕ Add School
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              {...register("name")}
              className="w-full rounded-lg px-3 py-2 bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Morden Public School"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Address
            </label>
            <input
              {...register("address")}
              className="w-full rounded-lg px-3 py-2 bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="123 Main St"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              City
            </label>
            <input
              {...register("city")}
              className="w-full rounded-lg px-3 py-2 bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="City"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">
                {errors.city.message}
              </p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              State
            </label>
            <input
              {...register("state")}
              className="w-full rounded-lg px-3 py-2 bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="State"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Contact
            </label>
            <input
              {...register("contact")}
              className="w-full rounded-lg px-3 py-2 bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="9264931896"
            />
            {errors.contact && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contact.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              {...register("email_id")}
              className="w-full rounded-lg px-3 py-2 bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="admin@school.edu"
            />
            {errors.email_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email_id.message}
              </p>
            )}
          </div>

          {/* Image */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="text-gray-300"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {String(errors.image.message)}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex gap-4 justify-end">
            <button
              disabled={submitting}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium hover:opacity-90 transition disabled:opacity-50"
              type="submit"
            >
              {submitting ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="px-5 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition"
              onClick={() => reset()}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
