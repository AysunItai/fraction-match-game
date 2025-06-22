export type FractionCard = {
  id: string;
  type: 'fraction' | 'visual' | 'challenge';
  content: string;
  matchId: string;
};

export const fractionCards: FractionCard[] = [
  // 1/2 group
  { id: '1', type: 'fraction', content: '1/2', matchId: 'half' },
  { id: '2', type: 'fraction', content: '2/4', matchId: 'half' },
  { id: '3', type: 'visual', content: '🟦🟦⬜⬜', matchId: 'half' },
  { id: '4', type: 'challenge', content: 'הסבירו מדוע 1/2 = 2/4', matchId: 'half' },

  // 3/4 group
  { id: '5', type: 'fraction', content: '3/4', matchId: 'three-fourths' },
  { id: '6', type: 'fraction', content: '6/8', matchId: 'three-fourths' },
  { id: '7', type: 'challenge', content: 'ציירו את 3/4 בעזרת צורות', matchId: 'three-fourths' },

  // 1/3 group
  { id: '8', type: 'fraction', content: '1/3', matchId: 'third' },
  { id: '9', type: 'fraction', content: '2/6', matchId: 'third' },
  { id: '10', type: 'challenge', content: 'הסבירו מדוע 1/3 = 2/6', matchId: 'third' },

  // 2/3 group
  { id: '11', type: 'fraction', content: '2/3', matchId: 'two-thirds' },
  { id: '12', type: 'fraction', content: '4/6', matchId: 'two-thirds' },

  // Greater-than challenges
  { id: '13', type: 'challenge', content: 'מה יותר גדול: 2/3 או 1/2?', matchId: 'gt1' },
  { id: '14', type: 'challenge', content: 'מה יותר גדול: 3/4 או 2/3?', matchId: 'gt2' },
];
