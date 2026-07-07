"use client";

import { X, QrCode } from "lucide-react";

interface QRTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventDate: string;
  venueName: string;
  venueAddress: string;
  userName: string;
  ticketId: string;
}

export default function QRTicketModal({
  isOpen,
  onClose,
  eventTitle,
  eventDate,
  venueName,
  venueAddress,
  userName,
  ticketId,
}: QRTicketModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray/10 transition-colors"
          aria-label="Close"
        >
          <X size={20} className="text-gray" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-navy mb-1">Booking Confirmed</h2>
          <p className="text-sm text-gray">Your digital ticket</p>
        </div>

        <div className="bg-gray/5 rounded-xl p-4 mb-4">
          <div className="flex justify-center mb-4">
            <div className="w-40 h-40 bg-white border-2 border-gray/20 rounded-lg flex items-center justify-center">
              {/* QR code representation using a grid pattern */}
              <div className="relative">
                <QrCode size={100} className="text-navy" strokeWidth={1} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[8px] font-mono text-navy/60 bg-white px-1">
                    {ticketId}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-1">
            <p className="font-semibold text-navy text-sm">{eventTitle}</p>
            <p className="text-xs text-gray">{eventDate}</p>
            <p className="text-xs text-gray">{venueName}</p>
            <p className="text-xs text-gray">{venueAddress}</p>
          </div>
        </div>

        <div className="border-t border-dashed border-gray/20 pt-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray">Attendee</span>
            <span className="font-medium text-navy">{userName}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray">Ticket ID</span>
            <span className="font-mono text-xs text-gray">{ticketId}</span>
          </div>
        </div>

        <p className="text-xs text-center text-gray">
          Show this QR code at the venue entrance for check-in.
        </p>
      </div>
    </div>
  );
}
