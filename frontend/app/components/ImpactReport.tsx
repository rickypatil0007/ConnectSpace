"use client";

import { ImpactReport } from "@/lib/dummy-data";
import { Users, Star, BarChart3, Heart } from "lucide-react";

interface ImpactReportViewProps {
  report: ImpactReport;
}

export default function ImpactReportView({ report }: ImpactReportViewProps) {
  const utilizationPercent = Math.round((report.totalAttendees / report.totalCapacity) * 100);

  return (
    <div className="bg-white rounded-xl border border-gray/15 p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-navy mb-1">{report.eventTitle}</h3>
      <p className="text-sm text-gray mb-5">Impact Report</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
        <div className="bg-blue/5 rounded-lg p-3 sm:p-4 text-center">
          <Users size={20} className="text-blue mx-auto mb-2" />
          <p className="text-xl sm:text-2xl font-bold text-navy">{report.totalAttendees}</p>
          <p className="text-xs text-gray">Attendees</p>
        </div>
        <div className="bg-purple/5 rounded-lg p-3 sm:p-4 text-center">
          <BarChart3 size={20} className="text-purple mx-auto mb-2" />
          <p className="text-xl sm:text-2xl font-bold text-navy">{utilizationPercent}%</p>
          <p className="text-xs text-gray">Capacity Used</p>
        </div>
        <div className="bg-yellow/5 rounded-lg p-3 sm:p-4 text-center">
          <Star size={20} className="text-yellow mx-auto mb-2" />
          <p className="text-xl sm:text-2xl font-bold text-navy">{report.averageRating}</p>
          <p className="text-xs text-gray">Avg Rating ({report.totalReviews} reviews)</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 sm:p-4 text-center">
          <Heart size={20} className="text-green-600 mx-auto mb-2" />
          <p className="text-xl sm:text-2xl font-bold text-navy">High</p>
          <p className="text-xs text-gray">Community Response</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-navy mb-1">Community Engagement</h4>
          <p className="text-sm text-gray">{report.communityEngagement}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-navy mb-1">Social Impact Summary</h4>
          <p className="text-sm text-gray">{report.socialImpactSummary}</p>
        </div>
      </div>
    </div>
  );
}
