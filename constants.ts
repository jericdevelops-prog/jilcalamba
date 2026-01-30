import { EventItem, LifeGroup } from "./types";

export const COLORS = {
  jilBlue: '#1e1c4d',
  jilLightBlue: '#60A5FA',
  jilGold: '#FBBF24',
  appBg: '#f9fafb',
};

export const MOCK_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Grand Youth Summit',
    category: 'YAN',
    date: '2023-11-15',
    image: 'https://picsum.photos/400/200?random=1',
    hideRegister: false,
  },
  {
    id: '2',
    title: 'Thanksgiving Service',
    category: 'ALL',
    date: '2023-11-20',
    image: 'https://picsum.photos/400/200?random=2',
    hideRegister: true,
  },
  {
    id: '3',
    title: 'KKB Music Workshop',
    category: 'KKB',
    date: '2023-11-25',
    image: 'https://picsum.photos/400/200?random=3',
    hideRegister: false,
  }
];

export const MOCK_GROUPS: LifeGroup[] = [
  {
    id: 'g1',
    name: 'Young Professionals',
    leaderName: 'Bro. John Doe',
    schedule: 'Fridays 7:00 PM',
    location: 'Pasay Proper',
    category: 'Young Pro',
  },
  {
    id: 'g2',
    name: 'Mothers of Faith',
    leaderName: 'Sis. Jane Smith',
    schedule: 'Wednesdays 2:00 PM',
    location: 'Mall of Asia',
    category: 'Women',
  }
];

export const BIBLE_BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", 
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", 
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", 
  "Ezra", "Nehemiah", "Esther", "Job", "Psalms", 
  "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", 
  "Jeremiah", "Lamentations", "Ezekiel", "Daniel", 
  "Hosea", "Joel", "Amos", "Obadiah", "Jonah", 
  "Micah", "Nahum", "Habakkuk", "Zephaniah", 
  "Haggai", "Zechariah", "Malachi", "Matthew", 
  "Mark", "Luke", "John", "Acts", "Romans", 
  "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", 
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", 
  "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", 
  "James", "1 Peter", "2 Peter", "1 John", "2 John", 
  "3 John", "Jude", "Revelation"
];
