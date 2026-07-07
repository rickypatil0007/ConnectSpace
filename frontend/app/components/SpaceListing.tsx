"use client";

import { Space } from "@/lib/dummy-data";
import { MapPin, Users, Clock, DollarSign, Car, Accessibility, Wrench } from "lucide-react";

interface SpaceListingProps {
  space: Space;
}

export default function SpaceListing({ space }: SpaceListingProps) {
  return (
    <div className="bg-white rounded-xl border border-gray/15 p-4 sm:p-5 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-base font-semibold text-navy">{space.name}</h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-blue/10 text-blue font-medium">
          {space.type}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        {/* Field 1: Address */}
        <div className="flex items-start gap-2">
          <MapPin size={14} className="text-gray mt-0.5 shrink-0" />
          <span className="text-gray">{space.address}</span>
        </div>

        {/* Field 2: Capacity */}
        <div className="flex items-center gap-2">
          <Users size={14} className="text-gray shrink-0" />
          <span className="text-gray">Capacity: <span className="text-navy font-medium">{space.capacity}</span></span>
        </div>

        {/* Field 3: Available Time Slots */}
        <div className="flex items-start gap-2">
          <Clock size={14} className="text-gray mt-0.5 shrink-0" />
          <div>
            <span className="text-gray">Time Slots: </span>
            {space.availableTimeSlots.map((slot, i) => (
              <span key={i} className="inline-block text-xs bg-gray/8 text-navy px-2 py-0.5 rounded mr-1 mt-0.5">
                {slot}
              </span>
            ))}
          </div>
        </div>

        {/* Field 4: Rental Charges */}
        <div className="flex items-center gap-2">
          <DollarSign size={14} className="text-gray shrink-0" />
          <span className="text-gray">Rental: <span className="text-navy font-medium">Rs {space.rentalCharges.toLocaleString()}</span></span>
        </div>

        {/* Field 5: Photos placeholder */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray/60">{space.photos.length > 0 ? `${space.photos.length} photos` : "No photos uploaded"}</span>
        </div>

        {/* Field 6: Amenities */}
        <div className="flex items-start gap-2">
          <Wrench size={14} className="text-gray mt-0.5 shrink-0" />
          <div className="flex flex-wrap gap-1">
            {space.amenities.map((amenity, i) => (
              <span key={i} className="text-xs bg-purple/8 text-purple px-2 py-0.5 rounded-full">
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Field 7: Parking availability */}
        <div className="flex items-center gap-2">
          <Car size={14} className="text-gray shrink-0" />
          <span className="text-gray">{space.parking}</span>
        </div>

        {/* Field 8: Accessibility features */}
        <div className="flex items-center gap-2">
          <Accessibility size={14} className="text-gray shrink-0" />
          <span className="text-gray">{space.accessibility}</span>
        </div>
      </div>
    </div>
  );
}
