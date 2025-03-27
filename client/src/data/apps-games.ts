p}
:
interface AppGame {
  id: string;
  name: string;
  url: string;
  description: string;
  category: 'app' | 'game';
  icon: string;
}

// We no longer need to encode the URL here, because we'll do it in the component
const proxyUrl = (url: string) => url;

// Collection of popular games that work well through a proxy
export const appsAndGames: AppGame[] = [
  // Games
  {
    id: 'slope',
    name: 'Slope',
    url: proxyUrl('https://slope-game.com/'),
    description: 'Race down a randomized slope, avoiding obstacles and collecting points.',
    category: 'game',
    icon: '🎮'
  },
  {
    id: 'retrobowl',
    name: 'Retro Bowl',
    url: proxyUrl('https://retro-bowl.com/'),
    description: 'A vintage-style American football game with simple controls.',
    category: 'game',
    icon: '🏈'
  },
  {
    id: '2048',
    name: '2048',
    url: proxyUrl('https://play2048.co/'),
    description: 'Merge tiles to reach 2048 in this addictive puzzle game.',
    category: 'game',
    icon: '🧩'
  },
  {
    id: 'crossyroad',
    name: 'Crossy Road',
    url: proxyUrl('https://poki.com/en/g/crossy-road'),
    description: 'Help your character cross busy roads and avoid obstacles.',
    category: 'game',
    icon: '🐔'
  },
  {
    id: 'flappybird',
    name: 'Flappy Bird',
    url: proxyUrl('https://flappybird.io/'),
    description: 'Navigate a bird through a series of pipes without hitting them.',
    category: 'game',
    icon: '🐦'
  },
  {
    id: 'chess',
    name: 'Chess.com',
    url: proxyUrl('https://www.chess.com/play/online'),
    description: 'Play chess online against AI or other players.',
    category: 'game',
    icon: '♟️'
  },
  {
    id: 'tetris',
    name: 'Tetris',
    url: proxyUrl('https://tetris.com/play-tetris'),
    description: 'Classic block-stacking puzzle game that tests your reflexes and strategy.',
    category: 'game',
    icon: '🎲'
  },
  {
    id: 'minecraft',
    name: 'Minecraft Classic',
    url: proxyUrl('https://classic.minecraft.net/'),
    description: 'Free browser version of the classic Minecraft creative mode.',
    category: 'game',
    icon: '⛏️'
  },
  {
    id: 'snake',
    name: 'Google Snake',
    url: proxyUrl('https://playsnake.org/'),
    description: 'Control a growing snake, eat food, and avoid running into yourself.',
    category: 'game',
    icon: '🐍'
  },
  {
    id: 'sudoku',
    name: 'Sudoku',
    url: proxyUrl('https://sudoku.com/'),
    description: 'Challenge your logic with this classic number placement puzzle.',
    category: 'game',
    icon: '🔢'
  },
  {
    id: 'cookie-clicker',
    name: 'Cookie Clicker',
    url: proxyUrl('https://orteil.dashnet.org/cookieclicker/'),
    description: 'Oddly satisfying incremental game about baking cookies.',
    category: 'game',
    icon: '🍪'
  },
  {
    id: 'wordle',
    name: 'Wordle',
    url: proxyUrl('https://www.nytimes.com/games/wordle/index.html'),
    description: 'Guess the five-letter word in six tries with color-coded hints.',
    category: 'game',
    icon: '📝'
  },
  
  // Apps
  {
    id: 'youtube',
    name: 'YouTube',
    url: proxyUrl('https://www.youtube.com/'),
    description: 'Watch and share videos from around the world.',
    category: 'app',
    icon: '📺'
  },
  {
    id: 'discord',
    name: 'Discord',
    url: proxyUrl('https://discord.com/app'),
    description: 'Text, voice, and video chat platform for communities.',
    category: 'app',
    icon: '💬'
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    url: proxyUrl('https://www.wikipedia.org/'),
    description: 'Free online encyclopedia with millions of articles.',
    category: 'app',
    icon: '📚'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    url: proxyUrl('https://open.spotify.com/'),
    description: 'Stream music, create playlists, and discover new songs.',
    category: 'app',
    icon: '🎵'
  },
  {
    id: 'reddit',
    name: 'Reddit',
    url: proxyUrl('https://www.reddit.com/'),
    description: 'Social news aggregation and discussion website.',
    category: 'app',
    icon: '📰'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    url: proxyUrl('https://twitter.com/'),
    description: 'Share and discover what\'s happening right now.',
    category: 'app',
    icon: '🐦'
  },
  {
    id: 'gmail',
    name: 'Gmail',
    url: proxyUrl('https://mail.google.com/'),
    description: 'Web-based email service from Google.',
    category: 'app',
    icon: '📧'
  },
  {
    id: 'github',
    name: 'GitHub',
    url: proxyUrl('https://github.com/'),
    description: 'Platform for hosting and collaborating on code repositories.',
    category: 'app',
    icon: '💻'
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    url: proxyUrl('https://www.pinterest.com/'),
    description: 'Visual discovery engine for finding ideas and inspiration.',
    category: 'app',
    icon: '📌'
  },
  {
    id: 'twitch',
    name: 'Twitch',
    url: proxyUrl('https://www.twitch.tv/'),
    description: 'Live streaming platform for gaming, entertainment, and more.',
    category: 'app',
    icon: '📡'
  },
  {
    id: 'duolingo',
    name: 'Duolingo',
    url: proxyUrl('https://www.duolingo.com/'),
    description: 'Free language learning platform with lessons and exercises.',
    category: 'app',
    icon: '🗣️'
  },
  {
    id: 'weather',
    name: 'Weather.com',
    url: proxyUrl('https://weather.com/'),
    description: 'Check weather forecasts for locations around the world.',
    category: 'app',
    icon: '🌤️'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    url: proxyUrl('https://www.tiktok.com/'),
    description: 'Short-form video platform for creating and discovering entertaining clips.',
    category: 'app',
    icon: '📱'
  }
];

// Helper function to get apps and games by category
export const getByCategory = (category: 'app' | 'game') => {
  return appsAndGames.filter(item => item.category === category);
};

// Helper function to get an app or game by ID
export const getById = (id: string) => {
  return appsAndGames.find(item => item.id === id);
};
