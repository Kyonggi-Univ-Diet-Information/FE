'use server';

import { ENDPOINT } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

export interface ReportReason {
  type: string;
  description: string;
}

interface ReportReasonResponse {
  result: { type: string; description: string }[];
}

export const fetchReportReasons = async (): Promise<ReportReason[]> => {
  try {
    const response = await Http.getDirect<ReportReasonResponse>({
      request: ENDPOINT.REVIEW_REPORT.REASONS,
      cache: 'force-cache',
    });

    return response.result;
  } catch (error) {
    console.error('Failed to fetch report reasons:', error);
    return [];
  }
};
