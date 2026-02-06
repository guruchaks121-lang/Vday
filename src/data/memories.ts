export type MemoryType = 'image' | 'video' | 'text' | 'pause' | 'letter' | 'choice' | 'future-lock';

export interface Memory {
  id: string;
  type: MemoryType;
  title?: string;
  content?: string | string[];
  mediaUrl?: string;
  audioUrl?: string;
  options?: string[];
  unlockDate?: string;
}

export const journeyUi = {
  introBadge: 'A memory journey',
  introTitle: 'Move slowly. Let each moment arrive.',
  startButton: 'Start Journey',
  letterLockedLabel: 'Locked letter',
  letterOpenLabel: 'Opened',
  letterRevealPrompt: 'Tap gently to reveal.',
  choiceConfirmationPrefix: 'Chosen:',
  futureLockPrefix: 'Locked until',
  futureLockNotYet: 'Not yet',
  futureLockFallbackDate: 'a future date',
};

export const memories: Memory[] = [
  {
    id: 'first-light',
    type: 'image',
    title: 'First Light',
    content: 'The morning felt almost still, like the world was waiting with us.',
    mediaUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_4f8ec5f7fe.mp3?filename=piano-moment-9835.mp3',
  },
  {
    id: 'small-things',
    type: 'text',
    title: 'Small Things',
    content: [
      'A glance across the room.',
      'A laugh we couldn\'t hold back.',
      'The way silence stopped feeling empty.',
    ],
  },
  {
    id: 'pause-breath',
    type: 'pause',
    content: 'Take one full breath here. No rush.',
  },
  {
    id: 'sealed-note',
    type: 'letter',
    title: 'A Sealed Note',
    content:
      'If this reaches you gently, then maybe all the hard days did their work. Thank you for staying soft in a sharp world.',
  },
  {
    id: 'crossroads',
    type: 'choice',
    title: 'Which part stays with you most?',
    options: ['The quiet mornings', 'The long walks', 'The unplanned laughter'],
  },
  {
    id: 'window-seat',
    type: 'video',
    title: 'Window Seat',
    content: 'Somewhere between leaving and arriving, we learned how to stay.',
    mediaUrl: 'https://videos.pexels.com/video-files/855564/855564-hd_1920_1080_25fps.mp4',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_02430c6f0b.mp3?filename=gentle-ambient-piano-12235.mp3',
  },
  {
    id: 'future',
    type: 'future-lock',
    title: 'For Later',
    content: 'When this opens, I hope you feel how deeply you were loved.',
    unlockDate: '2027-02-14T00:00:00.000Z',
  },
];
