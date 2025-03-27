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
  // New games
  {
    id: '1v1-lol-old',
    name: '1v1.LOL (Classic)',
    url: proxyUrl('https://1v1.lol/classic'),
    description: 'Old version of the build and shoot game 1v1.LOL.',
    category: 'game',
    icon: '🏗️'
  },
  {
    id: 'build-now-gg',
    name: 'Build Now GG',
    url: proxyUrl('https://www.buildnow.gg/'),
    description: 'Builder game similar to Fortnite where you can create and battle.',
    category: 'game',
    icon: '🏛️'
  },
  {
    id: '1v1-lol',
    name: '1v1.LOL',
    url: proxyUrl('https://1v1.lol/'),
    description: 'Build, break and eliminate in this competitive shooting game.',
    category: 'game',
    icon: '🔫'
  },
  {
    id: 'escape-road',
    name: 'Escape Road',
    url: proxyUrl('https://www.crazygames.com/game/escape-road'),
    description: 'Drive and dodge obstacles in this intense endless runner.',
    category: 'game',
    icon: '🚗'
  },
  {
    id: 'escape-road-2',
    name: 'Escape Road 2',
    url: proxyUrl('https://www.crazygames.com/game/escape-road-2'),
    description: 'Sequel to Escape Road with improved graphics and more challenges.',
    category: 'game',
    icon: '🏎️'
  },
  {
    id: 'polytrack',
    name: 'Polytrack',
    url: proxyUrl('https://www.crazygames.com/game/polytrack'),
    description: 'Race on procedurally generated low-poly tracks.',
    category: 'game',
    icon: '🛣️'
  },
  {
    id: 'eggy-car',
    name: 'Eggy Car',
    url: proxyUrl('https://www.mathplayground.com/eggy_car/index.html'),
    description: 'Guide an egg on wheels through challenging courses.',
    category: 'game',
    icon: '🥚'
  },
  {
    id: 'dogeminer',
    name: 'Dogeminer',
    url: proxyUrl('https://dogeminer.se/'),
    description: 'Mine Dogecoin in this humorous incremental game.',
    category: 'game',
    icon: '🐕'
  },
  {
    id: 'dogeminer-2',
    name: 'Dogeminer 2',
    url: proxyUrl('https://dogeminer2.com/'),
    description: 'Sequel to Dogeminer with more features and upgrades.',
    category: 'game',
    icon: '🚀'
  },
  {
    id: 'space-waves',
    name: 'Space Waves',
    url: proxyUrl('https://www.crazygames.com/game/space-waves'),
    description: 'Navigate through space avoiding obstacles and collecting powerups.',
    category: 'game',
    icon: '🌌'
  },
  {
    id: 'stickman-hook',
    name: 'Stickman Hook',
    url: proxyUrl('https://poki.com/en/g/stickman-hook'),
    description: 'Swing through challenging levels as a stickman with a grappling hook.',
    category: 'game',
    icon: '🪝'
  },
  {
    id: 'blockpost',
    name: 'Blockpost',
    url: proxyUrl('https://poki.com/en/g/blockpost'),
    description: 'Voxel-based multiplayer FPS with customizable characters.',
    category: 'game',
    icon: '🧱'
  },
  {
    id: 'rooftop-snipers',
    name: 'Rooftop Snipers',
    url: proxyUrl('https://www.crazygames.com/game/rooftop-snipers'),
    description: 'Funny physics-based 2-player sniper duel game.',
    category: 'game',
    icon: '🏙️'
  },
  {
    id: 'getaway-shootout',
    name: 'Getaway Shootout',
    url: proxyUrl('https://www.crazygames.com/game/getaway-shootout'),
    description: 'Race to escape while fighting your opponent in this multiplayer game.',
    category: 'game',
    icon: '🏃'
  },
  {
    id: 'snowrider',
    name: 'Snowrider',
    url: proxyUrl('https://www.crazygames.com/game/snow-rider-3d'),
    description: 'Ski down endless slopes performing tricks and avoiding obstacles.',
    category: 'game',
    icon: '⛷️'
  },
  {
    id: 'stompedio',
    name: 'Stomped.io',
    url: proxyUrl('https://stomped.io/'),
    description: 'Multiplayer game where you stomp on other players to grow bigger.',
    category: 'game',
    icon: '👣'
  },
  {
    id: 'coreball',
    name: 'Coreball',
    url: proxyUrl('https://www.crazygames.com/game/coreball-io'),
    description: 'Competitive multiplayer game where you control a ball to score points.',
    category: 'game',
    icon: '⚽'
  },
  {
    id: 'geometry-dash',
    name: 'Geometry Dash',
    url: proxyUrl('https://www.crazygames.com/game/geometry-dash-online'),
    description: 'Rhythm-based platformer with simple one-touch gameplay.',
    category: 'game',
    icon: '◻️'
  },
  {
    id: 'drive-mad',
    name: 'Drive Mad',
    url: proxyUrl('https://poki.com/en/g/drive-mad'),
    description: 'Physics-based driving game with challenging tracks.',
    category: 'game',
    icon: '🚘'
  },
  {
    id: 'burrito-bison',
    name: 'Burrito Bison',
    url: proxyUrl('https://www.crazygames.com/game/burrito-bison-launcha-libre'),
    description: 'Launch your character to crush gummy bears in this addictive game.',
    category: 'game',
    icon: '🌯'
  },
  {
    id: 'subway-surfers',
    name: 'Subway Surfers',
    url: proxyUrl('https://poki.com/en/g/subway-surfers'),
    description: 'Run along the tracks dodging trains and obstacles in this endless runner.',
    category: 'game',
    icon: '🚇'
  },
  {
    id: 'bitlife',
    name: 'BitLife',
    url: proxyUrl('https://gamepix.com/play/bitlife'),
    description: 'Life simulator game where you make choices from birth to death.',
    category: 'game',
    icon: '👶'
  },
  {
    id: 'bitplanes',
    name: 'Bitplanes',
    url: proxyUrl('https://www.crazygames.com/game/bitplanes-io'),
    description: 'Multiplayer airplane combat game with retro graphics.',
    category: 'game',
    icon: '✈️'
  },
  {
    id: 'rodeo-stampede',
    name: 'Rodeo Stampede',
    url: proxyUrl('https://poki.com/en/g/rodeo-stampede'),
    description: 'Ride and tame wild animals in this endless safari adventure.',
    category: 'game',
    icon: '🦓'
  },
  {
    id: 'run-3',
    name: 'Run 3',
    url: proxyUrl('https://www.coolmathgames.com/0-run-3'),
    description: 'Navigate a series of space tunnels in this 3D platformer.',
    category: 'game',
    icon: '👟'
  },
  {
    id: 'tunnel-rush',
    name: 'Tunnel Rush',
    url: proxyUrl('https://poki.com/en/g/tunnel-rush'),
    description: 'Speed through a colorful 3D tunnel avoiding obstacles.',
    category: 'game',
    icon: '🌀'
  },
  {
    id: 'rocket-bot-royale',
    name: 'Rocket Bot Royale',
    url: proxyUrl('https://poki.com/en/g/rocket-bot-royale'),
    description: 'Battle royale game with rocket-powered tanks.',
    category: 'game',
    icon: '🚀'
  },
  {
    id: 'monkey-mart',
    name: 'Monkey Mart',
    url: proxyUrl('https://poki.com/en/g/monkey-mart'),
    description: 'Run a supermarket with monkeys in this idle management game.',
    category: 'game',
    icon: '🐒'
  },
  {
    id: 'super-liquid-soccer',
    name: 'Super Liquid Soccer',
    url: proxyUrl('https://www.crazygames.com/game/super-liquid-soccer'),
    description: 'Physics-based soccer game with liquid players.',
    category: 'game',
    icon: '⚽'
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
  },
  // New apps
  {
    id: 'fortnitegg',
    name: 'FortniteGG',
    url: proxyUrl('https://fortnite.gg/'),
    description: 'Fortnite stats, maps, cosmetics and more for Fortnite Battle Royale.',
    category: 'app',
    icon: '🎒'
  },
  {
    id: 'monkeygg2',
    name: 'MonkeyGG2',
    url: proxyUrl('https://monkeygg2.github.io/'),
    description: 'Collection of unblocked games to play in your browser.',
    category: 'app',
    icon: '🙈'
  },
  {
    id: 'virlan',
    name: 'Virlan',
    url: proxyUrl('https://virlan.io/'),
    description: 'Discover and play online web games all in one place.',
    category: 'app',
    icon: '🎯'
  },
  {
    id: 'kodub',
    name: 'Kodub',
    url: proxyUrl('https://www.kodub.com/'),
    description: 'Educational platform for learning through interactive content.',
    category: 'app',
    icon: '📘'
  },
  {
    id: 'xbox-cloud',
    name: 'Xbox Cloud Gaming',
    url: proxyUrl('https://www.xbox.com/play'),
    description: 'Stream and play Xbox games directly in your browser.',
    category: 'app',
    icon: '🎮'
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
