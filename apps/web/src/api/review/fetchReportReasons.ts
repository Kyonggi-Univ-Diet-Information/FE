'use server';

import { ENDPOINT } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

import type { FetchReportReasonsResponse } from './api.model';
import type { ReportReason } from './api.type';


interface ReportReasonApiResponse {
  result: ReportReason[];
}

export const fetchReportReasons = async (): Promise<FetchReportReasonsResponse> => {
  try {
    const response = await Http.getDirect<ReportReasonApiResponse>({
      request: ENDPOINT.REVIEW_REPORT.REASONS,
      cache: 'force-cache',
    });

    return response.result;
  } catch (error) {
    console.error('Failed to fetch report reasons:', error);
    return [];
  }
};
