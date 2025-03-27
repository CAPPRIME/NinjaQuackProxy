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
    id: 'smash-karts',
    name: 'Smash Karts',
    url: proxyUrl('https://smashkarts.io/'),
    description: 'Drive, battle and smash your way through arenas in this multiplayer kart game.',
    category: 'game',
    icon: '🏎️'
  },
  {
    id: 'block-blast',
    name: 'Block Blast',
    url: proxyUrl('https://poki.com/en/g/block-blast'),
    description: 'Match 3 or more identical blocks to clear them in this puzzle game.',
    category: 'game',
    icon: '🧩'
  },
  {
    id: 'fortnite-cloud',
    name: 'Fortnite (Xbox Cloud)',
    url: proxyUrl('https://www.xbox.com/play/games/fortnite/BT5P2X999VH2'),
    description: 'Battle, build, and survive in the popular battle royale game via Xbox Cloud Gaming.',
    category: 'game',
    icon: '🔫'
  },
  {
    id: 'tiny-fishing',
    name: 'Tiny Fishing',
    url: proxyUrl('https://poki.com/en/g/tiny-fishing'),
    description: 'Catch fish and upgrade your gear in this relaxing fishing game.',
    category: 'game',
    icon: '🎣'
  },
  {
    id: 'yohoho-io',
    name: 'YoHoHo.io',
    url: proxyUrl('https://yohoho.io/'),
    description: 'Pirate battle royale game where you knock other players off the island.',
    category: 'game',
    icon: '⚓'
  },
  {
    id: 'ovo',
    name: 'OvO',
    url: proxyUrl('https://poki.com/en/g/ovo'),
    description: 'Precision platformer with smooth controls and challenging levels.',
    category: 'game',
    icon: '🥚'
  },
  {
    id: 'chill-guy-clicker',
    name: 'Chill Guy Clicker',
    url: proxyUrl('https://poki.com/en/g/chill-guy-clicker'),
    description: 'Idle clicker game where you help a chill guy become the chillest.',
    category: 'game',
    icon: '😎'
  },
  {
    id: 'moto-x3m',
    name: 'Moto X3M',
    url: proxyUrl('https://poki.com/en/g/moto-x3m'),
    description: 'Motorcycle stunt game with challenging obstacles and tracks.',
    category: 'game',
    icon: '🏍️'
  },
  {
    id: 'moto-x3m-2',
    name: 'Moto X3M 2',
    url: proxyUrl('https://poki.com/en/g/moto-x3m-2'),
    description: 'Sequel to Moto X3M with new levels and challenges.',
    category: 'game',
    icon: '🏍️'
  },
  {
    id: 'moto-x3m-3',
    name: 'Moto X3M 3',
    url: proxyUrl('https://poki.com/en/g/moto-x3m-pool-party'),
    description: 'Pool party themed edition of the popular Moto X3M series.',
    category: 'game',
    icon: '🏍️'
  },
  {
    id: 'hole-io',
    name: 'Hole.io',
    url: proxyUrl('https://hole-io.com/'),
    description: 'Consume everything as a black hole and become the biggest in the arena.',
    category: 'game',
    icon: '⚫'
  },
  {
    id: 'territorial',
    name: 'Territorial.io',
    url: proxyUrl('https://territorial.io/'),
    description: 'Expand your territory and conquer other players in this strategic io game.',
    category: 'game',
    icon: '🗺️'
  },
  {
    id: 'tomb-of-the-mask',
    name: 'Tomb of the Mask',
    url: proxyUrl('https://poki.com/en/g/tomb-of-the-mask'),
    description: 'Fast-paced arcade game where you navigate a maze collecting points.',
    category: 'game',
    icon: '😷'
  },
  {
    id: 'we-become-what-we-behold',
    name: 'We Become What We Behold',
    url: proxyUrl('https://ncase.itch.io/wbwwb'),
    description: 'A game about news cycles, vicious cycles, and cycles of violence.',
    category: 'game',
    icon: '📱'
  },
  {
    id: 'temple-of-boom',
    name: 'Temple of Boom',
    url: proxyUrl('https://poki.com/en/g/temple-of-boom'),
    description: 'Action-packed temple runner with explosives and obstacles.',
    category: 'game',
    icon: '💣'
  },
  {
    id: 'basket-random',
    name: 'Basket Random',
    url: proxyUrl('https://poki.com/en/g/basket-random'),
    description: 'Chaotic physics-based basketball game with random characters.',
    category: 'game',
    icon: '🏀'
  },
  {
    id: 'soccer-random',
    name: 'Soccer Random',
    url: proxyUrl('https://poki.com/en/g/soccer-random'),
    description: 'Hilarious soccer game with random physics and characters.',
    category: 'game',
    icon: '⚽'
  },
  {
    id: 'volleyball-random',
    name: 'Volleyball Random',
    url: proxyUrl('https://poki.com/en/g/volleyball-random'),
    description: 'Funny volleyball game with unpredictable physics.',
    category: 'game',
    icon: '🏐'
  },
  {
    id: 'boxing-random',
    name: 'Boxing Random',
    url: proxyUrl('https://poki.com/en/g/boxing-random'),
    description: 'Chaotic boxing game with random physics and movements.',
    category: 'game',
    icon: '🥊'
  },
  {
    id: 'drift-boss',
    name: 'Drift Boss',
    url: proxyUrl('https://poki.com/en/g/drift-boss'),
    description: 'Skillfully navigate your car around a track that twists and turns.',
    category: 'game',
    icon: '🚗'
  },
  {
    id: '10-minutes-till-dawn',
    name: '10 Minutes Till Dawn',
    url: proxyUrl('https://poki.com/en/g/10-minutes-till-dawn'),
    description: 'Survive for 10 minutes against waves of eldritch horrors.',
    category: 'game',
    icon: '🌑'
  },
  {
    id: 'bloxd-io',
    name: 'Bloxd.io',
    url: proxyUrl('https://bloxd.io/'),
    description: 'Multiplayer puzzle game where you push blocks to reach the goal.',
    category: 'game',
    icon: '📦'
  },
  {
    id: 'shell-shockers',
    name: 'Shell Shockers',
    url: proxyUrl('https://shellshock.io/'),
    description: 'FPS game where you play as eggs armed with guns.',
    category: 'game',
    icon: '🥚'
  },
  {
    id: 'basket-legends',
    name: 'Basket Legends',
    url: proxyUrl('https://poki.com/en/g/basket-legends'),
    description: 'Competitive basketball game with various characters and powers.',
    category: 'game',
    icon: '🏀'
  },
  {
    id: 'basket-bros',
    name: 'Basket Bros',
    url: proxyUrl('https://basketbros.io/'),
    description: 'Multiplayer basketball game with physics-based gameplay.',
    category: 'game',
    icon: '🏀'
  },
  {
    id: 'level-devil',
    name: 'Level Devil',
    url: proxyUrl('https://poki.com/en/g/level-devil'),
    description: 'Fiendishly difficult platformer requiring precision and timing.',
    category: 'game',
    icon: '😈'
  },
  {
    id: 'infinite-craft',
    name: 'Infinite Craft',
    url: proxyUrl('https://neal.fun/infinite-craft/'),
    description: 'Combine elements to create new discoveries in this crafting game.',
    category: 'game',
    icon: '⚗️'
  },
  {
    id: 'cluster-rush',
    name: 'Cluster Rush',
    url: proxyUrl('https://poki.com/en/g/cluster-rush'),
    description: 'Jump between speeding trucks in this fast-paced 3D platformer.',
    category: 'game',
    icon: '🚚'
  },
  {
    id: 'tanuki-sunset',
    name: 'Tanuki Sunset',
    url: proxyUrl('https://poki.com/en/g/tanuki-sunset'),
    description: 'Skateboard downhill as a raccoon in this stylish longboarding game.',
    category: 'game',
    icon: '🦝'
  },
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
    url: proxyUrl('https://bitlifesimulator.io/'),
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
    url: proxyUrl('https://rocketbotroyale2.winterpixel.io/'),
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
    id: 'incognito-proxy',
    name: 'Incognito Proxy',
    url: proxyUrl('https://incog.dev/'),
    description: 'Alternative web proxy service for anonymous browsing.',
    category: 'app',
    icon: '🕵️'
  },
  {
    id: '123movies',
    name: '123Movies',
    url: proxyUrl('https://123chill.to/'),
    description: 'Watch movies and TV shows online for free.',
    category: 'app',
    icon: '🎬'
  },
  {
    id: 'totally-science',
    name: 'Totally Science',
    url: proxyUrl('https://totallyscience.co/'),
    description: 'Collection of unblocked games and educational content.',
    category: 'app',
    icon: '🔬'
  },
  {
    id: 'ninja-chat',
    name: 'Ninja Chat Room',
    url: proxyUrl('https://chatrooms.coderbridge.io/'),
    description: 'Free online chat room for NinjaQuack users to communicate.',
    category: 'app',
    icon: '💬'
  },
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
