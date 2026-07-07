"use client";

import { useState, useRef } from "react";
import { ALL_SPACE_TYPES, SpaceType } from "@/lib/dummy-data";
import { Plus, X, Camera, Clock, Send, ImageIcon } from "lucide-react";

interface SpaceListingFormProps {
  onSubmit: (data: SpaceFormData) => void;
}

export interface SpaceFormData {
  name: string;
  type: SpaceType;
  address: string;
  locality: string;
  capacity: number;
  availableTimeSlots: string[];
  rentalCharges: number;
  photos: string[];
  amenities: string[];
  parking: string;
  accessibility: string;
}

const localities = ["Kandivali", "Borivali", "Malad", "Andheri", "Goregaon", "Dahisar"];

const commonAmenities = [
  "Projector",
  "Sound System",
  "AC",
  "Chairs",
  "Tables",
  "Stage",
  "Kitchen",
  "Restrooms",
  "Wi-Fi",
  "Power Backup",
  "Lighting",
  "Water Supply",
];

const parkingOptions = [
  "Free parking available",
  "Paid parking available",
  "Street parking only",
  "No parking available",
];

const accessibilityOptions = [
  "Wheelchair accessible",
  "Elevator access",
  "Ground floor only",
  "Ramp available",
  "Not wheelchair accessible",
];

export default function SpaceListingForm({ onSubmit }: SpaceListingFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<SpaceFormData>({
    name: "",
    type: "Community Hall",
    address: "",
    locality: "",
    capacity: 0,
    availableTimeSlots: [],
    rentalCharges: 0,
    photos: [],
    amenities: [],
    parking: "",
    accessibility: "",
  });

  // Time slot management
  const [newSlot, setNewSlot] = useState("");

  // Photo preview URLs
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);

  const update = (field: keyof SpaceFormData, value: string | number | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addTimeSlot = () => {
    if (newSlot.trim() && !form.availableTimeSlots.includes(newSlot.trim())) {
      update("availableTimeSlots", [...form.availableTimeSlots, newSlot.trim()]);
      setNewSlot("");
    }
  };

  const removeTimeSlot = (slot: string) => {
    update(
      "availableTimeSlots",
      form.availableTimeSlots.filter((s) => s !== slot)
    );
  };

  const toggleAmenity = (amenity: string) => {
    if (form.amenities.includes(amenity)) {
      update(
        "amenities",
        form.amenities.filter((a) => a !== amenity)
      );
    } else {
      update("amenities", [...form.amenities, amenity]);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos: string[] = [];
    const newPreviews: string[] = [];

    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      newPhotos.push(file.name);
      newPreviews.push(url);
    });

    update("photos", [...form.photos, ...newPhotos]);
    setPhotoPreviewUrls((prev) => [...prev, ...newPreviews]);

    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = form.photos.filter((_, i) => i !== index);
    const updatedPreviews = photoPreviewUrls.filter((_, i) => i !== index);
    // Revoke the object URL to free memory
    URL.revokeObjectURL(photoPreviewUrls[index]);
    update("photos", updatedPhotos);
    setPhotoPreviewUrls(updatedPreviews);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    // Reset form
    setForm({
      name: "",
      type: "Community Hall",
      address: "",
      locality: "",
      capacity: 0,
      availableTimeSlots: [],
      rentalCharges: 0,
      photos: [],
      amenities: [],
      parking: "",
      accessibility: "",
    });
    // Revoke all preview URLs
    photoPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    setPhotoPreviewUrls([]);
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray/20 rounded-lg text-sm text-navy placeholder:text-gray/50 focus:outline-none focus:border-blue transition-colors";
  const labelClass = "block text-sm font-medium text-navy mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="text-lg font-semibold text-navy mb-2">List a New Space</h3>
      <p className="text-sm text-gray -mt-1">
        Register your idle or underutilized space to receive event hosting requests from organizers.
      </p>

      {/* Space Name */}
      <div>
        <label htmlFor="spaceName" className={labelClass}>Space Name</label>
        <input
          id="spaceName"
          type="text"
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="e.g., Sunrise Community Hall"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Space Type */}
        <div>
          <label htmlFor="spaceType" className={labelClass}>Space Type</label>
          <select
            id="spaceType"
            required
            value={form.type}
            onChange={(e) => update("type", e.target.value)}
            className={inputClass}
          >
            {ALL_SPACE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Locality */}
        <div>
          <label htmlFor="spaceLocality" className={labelClass}>Locality</label>
          <select
            id="spaceLocality"
            required
            value={form.locality}
            onChange={(e) => update("locality", e.target.value)}
            className={inputClass}
          >
            <option value="">Select locality</option>
            {localities.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="spaceAddress" className={labelClass}>Full Address</label>
        <textarea
          id="spaceAddress"
          required
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
          rows={2}
          placeholder="e.g., Plot 42, Sector 5, Near Metro Station, Kandivali West"
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Capacity */}
        <div>
          <label htmlFor="spaceCapacity" className={labelClass}>Capacity (people)</label>
          <input
            id="spaceCapacity"
            type="number"
            required
            min={1}
            value={form.capacity || ""}
            onChange={(e) => update("capacity", parseInt(e.target.value) || 0)}
            placeholder="e.g., 300"
            className={inputClass}
          />
        </div>

        {/* Rental Charges */}
        <div>
          <label htmlFor="rentalCharges" className={labelClass}>Rental Charges (Rs / event)</label>
          <input
            id="rentalCharges"
            type="number"
            required
            min={0}
            value={form.rentalCharges || ""}
            onChange={(e) => update("rentalCharges", parseInt(e.target.value) || 0)}
            placeholder="e.g., 15000"
            className={inputClass}
          />
        </div>
      </div>

      {/* Available Time Slots */}
      <div>
        <label className={labelClass}>
          <Clock size={14} className="inline mr-1 -mt-0.5" />
          Available Time Slots
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newSlot}
            onChange={(e) => setNewSlot(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTimeSlot();
              }
            }}
            placeholder="e.g., Weekdays 9AM-6PM"
            className={`${inputClass} flex-1`}
          />
          <button
            type="button"
            onClick={addTimeSlot}
            className="px-3 py-2 rounded-lg bg-blue/10 text-blue text-sm font-medium hover:bg-blue/20 transition-colors flex items-center gap-1 shrink-0"
          >
            <Plus size={14} />
            Add
          </button>
        </div>
        {form.availableTimeSlots.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {form.availableTimeSlots.map((slot) => (
              <span
                key={slot}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue/8 text-navy text-xs rounded-full"
              >
                {slot}
                <button
                  type="button"
                  onClick={() => removeTimeSlot(slot)}
                  className="text-gray hover:text-red-500 transition-colors"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
        {form.availableTimeSlots.length === 0 && (
          <p className="text-xs text-gray/60">Press Enter or click Add to include a time slot.</p>
        )}
      </div>

      {/* Photos */}
      <div>
        <label className={labelClass}>
          <Camera size={14} className="inline mr-1 -mt-0.5" />
          Photos
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
          className="hidden"
          id="photoUpload"
        />

        {photoPreviewUrls.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
            {photoPreviewUrls.map((url, index) => (
              <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-gray/20">
                <img
                  src={url}
                  alt={`Space photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                  style={{ opacity: undefined }}
                >
                  <X size={12} />
                </button>
                {/* Always visible delete on touch devices */}
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="sm:hidden absolute top-1 right-1 p-1 rounded-full bg-red-500/80 text-white"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-3 px-4 rounded-lg border-2 border-dashed border-gray/25 text-sm text-gray hover:border-blue/40 hover:text-blue hover:bg-blue/5 transition-all flex items-center justify-center gap-2"
        >
          <ImageIcon size={18} />
          {photoPreviewUrls.length > 0 ? "Add More Photos" : "Upload Photos of Your Space"}
        </button>
        <p className="text-xs text-gray/60 mt-1">Upload images showing your space from different angles.</p>
      </div>

      {/* Amenities */}
      <div>
        <label className={labelClass}>Amenities</label>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {commonAmenities.map((amenity) => {
            const isSelected = form.amenities.includes(amenity);
            return (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border ${
                  isSelected
                    ? "bg-purple text-white border-purple"
                    : "bg-white text-navy border-gray/20 hover:border-purple/40 hover:bg-purple/5"
                }`}
              >
                {amenity}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Parking */}
        <div>
          <label htmlFor="parking" className={labelClass}>Parking Availability</label>
          <select
            id="parking"
            required
            value={form.parking}
            onChange={(e) => update("parking", e.target.value)}
            className={inputClass}
          >
            <option value="">Select parking option</option>
            {parkingOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Accessibility */}
        <div>
          <label htmlFor="accessibility" className={labelClass}>Accessibility Features</label>
          <select
            id="accessibility"
            required
            value={form.accessibility}
            onChange={(e) => update("accessibility", e.target.value)}
            className={inputClass}
          >
            <option value="">Select accessibility</option>
            {accessibilityOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2.5 px-4 rounded-lg bg-purple text-white text-sm font-medium transition-colors hover:bg-purple/90 flex items-center justify-center gap-2"
      >
        <Send size={16} />
        List My Space
      </button>
    </form>
  );
}
