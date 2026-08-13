import { SITE } from '@/lib/config';

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'free',
    question: 'Is it free?',
    answer: `After launch, the first ${SITE.earlyRiderCap.toLocaleString('en-PK')} riders get Wild Nomad free. If paid features ever arrive later, the map and the planner stay free.`,
  },
  {
    id: 'launch',
    question: 'When does it launch?',
    answer: `${SITE.launchWindow} on Android. Leave your email and you'll get it the day it's live.`,
  },
  {
    id: 'ios',
    question: 'Will there be an iOS version?',
    answer:
      "Android first, because that's what most riders in Pakistan carry. iOS follows. Leave your email either way.",
  },
  {
    id: 'offline',
    question: 'Does it work without signal?',
    answer:
      'Download a region before you leave and your stops, routes, alerts and emergency numbers all work offline. Map tiles still need a connection, so download while you have one.',
  },
  {
    id: 'data',
    question: 'Where does the data come from?',
    answer:
      'Riders. Every stop is submitted by someone who was there and reviewed before it goes live. The map starts with 100+ verified stops and grows with every ride.',
  },
  {
    id: 'coverage',
    question: 'Which parts of Pakistan are covered?',
    answer:
      'The northern corridors are strongest — Hunza, Gilgit, Skardu, Kaghan, Naran, Chitral, Swat, AJK and Galiyat — plus Islamabad, Punjab and the Makran coast. Coverage follows wherever riders go.',
  },
  {
    id: 'add-stop',
    question: 'Can I add a stop myself?',
    answer:
      "Yes, that's the point. Pin it in the app, add a photo and a note, and once it's verified it's on the map with your name on it.",
  },
  {
    id: 'location',
    question: 'How do you handle my location data?',
    answer:
      'Location is used to show nearby stops, record a ride you start, and share your position only when you choose to. It is never sold. See the privacy policy at /privacy.',
  },
];
