import type { Ticket, IssueCategory } from './types';

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 'CP-12345',
    category: 'Pothole',
    address: '123 Main St, Anytown, USA',
    status: 'Resolved',
    submittedAt: new Date('2024-07-20T10:00:00Z'),
    resolvedAt: new Date('2024-07-21T14:30:00Z'),
    image: { url: 'https://picsum.photos/600/400', hint: 'pothole road' },
    resolutionImage: {
      url: 'https://picsum.photos/600/400',
      hint: 'repaired road',
    },
    description:
      'Large pothole in the middle of the road, causing traffic issues.',
    eta: 'Resolved',
    severityScore: 85,
    justification:
      "The pothole poses a significant safety hazard to vehicles and could cause accidents or damage. It's located on a busy street, increasing its impact.",
  },
  {
    id: 'CP-12346',
    category: 'Garbage',
    address: '456 Oak Ave, Anytown, USA',
    status: 'In Progress',
    submittedAt: new Date('2024-07-21T11:00:00Z'),
    image: { url: 'https://picsum.photos/600/400', hint: 'garbage overflow' },
    description: 'Overflowing public trash can at the park entrance.',
    eta: 'Within 24 hours',
    severityScore: 45,
    justification:
      "While unsightly and unhygienic, the overflowing garbage is contained to one bin and doesn't pose an immediate, widespread public health risk. It requires timely but not emergency attention.",
  },
  {
    id: 'CP-12347',
    category: 'Streetlight',
    address: '789 Pine Ln, Anytown, USA',
    status: 'Assigned',
    submittedAt: new Date('2024-07-22T09:00:00Z'),
    image: {
      url: 'https://picsum.photos/600/400',
      hint: 'broken streetlight',
    },
    description: 'Streetlight is out on a residential corner.',
    eta: 'Within 48 hours',
    severityScore: 60,
    justification:
      "A non-functioning streetlight can lead to reduced visibility and potential safety concerns for pedestrians and drivers at night. It's a moderate risk that should be addressed.",
  },
  {
    id: 'CP-12348',
    category: 'Fallen Tree',
    address: '101 Maple Dr, Anytown, USA',
    status: 'Submitted',
    submittedAt: new Date('2024-07-23T08:00:00Z'),
    image: { url: 'https://picsum.photos/600/400', hint: 'fallen tree' },
    description:
      'A large branch has fallen onto the sidewalk, blocking pedestrian access.',
    eta: 'Pending assessment',
    severityScore: 70,
    justification:
      'The fallen branch is obstructing a public walkway, forcing pedestrians into the street. This poses a safety risk and impedes accessibility, requiring prompt removal.',
  },
];

export const MOCK_ISSUES_ON_MAP = [
  {
    id: 1,
    position: { top: '20%', left: '30%' },
    count: 5,
    category: 'Pothole' as IssueCategory,
  },
  {
    id: 2,
    position: { top: '40%', left: '60%' },
    count: 2,
    category: 'Garbage' as IssueCategory,
  },
  {
    id: 3,
    position: { top: '65%', left: '25%' },
    count: 8,
    category: 'Streetlight' as IssueCategory,
  },
  {
    id: 4,
    position: { top: '50%', left: '80%' },
    count: 1,
    category: 'Water Leakage' as IssueCategory,
  },
  {
    id: 5,
    position: { top: '80%', left: '50%' },
    count: 3,
    category: 'Fallen Tree' as IssueCategory,
  },
];
