export type IssueCategory =
  | 'Garbage'
  | 'Pothole'
  | 'Streetlight'
  | 'Water Leakage'
  | 'Fallen Tree'
  | 'Other';

export type TicketStatus =
  | 'Submitted'
  | 'Assigned'
  | 'In Progress'
  | 'Resolved';

export interface ImageWithHint {
  url: string;
  hint: string;
}

export interface Ticket {
  id: string;
  category: IssueCategory;
  address: string;
  status: TicketStatus;
  submittedAt: Date;
  resolvedAt?: Date;
  image: ImageWithHint;
  resolutionImage?: ImageWithHint;
  description: string;
  eta: string;
  severityScore?: number;
  justification?: string;
}
