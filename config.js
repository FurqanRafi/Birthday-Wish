/**
 * ===================================================================
 * 💖 BIRTHDAY SURPRISE CONFIGURATION 💖
 * ===================================================================
 * You can easily customize any text, name, photos, videos, messages,
 * and music right here! Everything will automatically update across
 * the entire website.
 */

const BIRTHDAY_CONFIG = {
  // ─── 1. Basic Info ───────────────────────────────────────────────
  girlfriendName: "Savi", // Change this to her name or nickname (e.g. "Savi", "My Love", "Princess")
  partnerName: "Yours Forever", // Your name or signature
  birthdayDate: "August 21", // Her birthday date or special day
  
  // ─── 2. Music & Audio Settings ───────────────────────────────────
  audio: {
    // If you have an MP3 file or online music link, paste the URL here.
    // If left empty or if external audio fails, the built-in procedural
    // romantic music box synthesizer will automatically play magical lullabies!
    bgmUrl: "", 
    autoPlayPrompt: true, // Will start gentle romantic music on first interaction
    defaultVolume: 0.2,
  },

  // ─── 3. Opening Scene ────────────────────────────────────────────
  opening: {
    greeting: "Hey Beautiful... ❤️",
    subGreeting: "I made something very special, just for you.",
    giftBoxPrompt: "Tap the magical gift box to open your surprise ✨",
    giftRevealTitle: "Today isn't just another day...",
    giftRevealSubtitle: "It's the day someone incredibly special came into this world. ❤️",
    continueButtonText: "Let's Play A Little Game ✨",
  },

  // ─── 4. "Catch The Love" Mini-Game ───────────────────────────────
  miniGame: {
    targetHearts: 7, // How many hearts she needs to catch to unlock the next surprise
    title: "Catch My Love ❤️",
    subtitle: "Tap the floating hearts floating around to collect my feelings for you!",
    // Romantic mini-messages shown every time she catches a heart
    heartMessages: [
      "You make my world brighter every single day ❤️",
      "You're my favorite person in the entire universe ✨",
      "Every single memory with you is a treasure 💖",
      "You deserve all the happiness in the world and more 🌸",
      "I love seeing your beautiful smile 😊",
      "You are my safest place and my sweetest dream 💕",
      "Thank you for being uniquely, wonderfully you 🌹",
      "My heart beats a little faster whenever you're near 💓",
      "With you, even the simplest days feel like magic ✨",
      "I fall in love with you more and more every day 🥰"
    ],
    completedTitle: "You collected all the love! ❤️",
    completedSubtitle: "Every piece of my heart belongs to you... but wait, there's another surprise for you.",
    unlockButtonText: "Unlock Your Birthday Message 💝",
  },

  // ─── 5. Grand Birthday Reveal & Love Letter ──────────────────────
  birthdayReveal: {
    header: "Happy Birthday, My Love ❤️",
    // Lines typed out naturally with the romantic typewriter effect
    letterParagraphs: [
      "Happy Birthday to the most beautiful, kind-hearted, and incredible person in my world.",
      "I hope your smile always stays this radiant, your heart always stays this joyful, and every single dream you hold close comes true.",
      "Thank you for being such a wonderful blessing in my life. Today is all about celebrating you, and I just want you to know how deeply cherished and precious you are to me.",
      "I may not be able to give you the whole world in a box, but I promise to spend every day making my little world with you warm, safe, and full of love.",
      "Happy Birthday, my favorite person. Forever and always. ❤️"
    ],
    nextButtonText: "Walk Down Memory Lane 📸✨",
  },

  // ─── 6. Romantic Scrapbook & Memory Album ─────────────────────────
  // All photos and video clips are stored in the "public" folder (e.g., "public/photo1.jpg")
  memories: {
    title: "Our Little Memories 📸❤️",
    subtitle: "A digital scrapbook of moments I will cherish for the rest of my life.",
    categories: ["All", "Us ❤️", "Beautiful Moments ✨", "Funny Memories 😂", "Special Days 💕", "Our Story 📖"],
    items: [
      {
        id: 1,
        type: "video",
        category: "Beautiful Moments ✨",
        title: "Teri Muskurahat 🌸",
        date: "Ek Pyaari Si Smile",
        caption: "Teri smile dekh ke dil ko sukoon milta hai — teri khushi meri khushi hai. 💕",
        url: "public/Snapchat-668572326.mp4",
        tag: "Meri Jaan"
      },
      {
        id: 2,
        type: "video",
        category: "Beautiful Moments ✨",
        title: "Kitni Pyari Hai Tu ✨",
        date: "Bas Teri Ek Jhalak",
        caption: "Tujhe dekh kar dil ko itna sukoon aur khushi milti hai — kitni pyari aur masoom lagti hai tu. ❤️",
        url: "public/Snapchat-160416848.mp4",
        tag: "Meri Favorite Person"
      },
      {
        id: 3,
        type: "image",
        category: "Special Days 💕",
        title: "Tu Hi Meri Dunya 💖",
        date: "Meri Chand",
        caption: "Yeh tasveer dekh ke dil khush ho jata hai — tu sach mein meri poori duniya hai. 🌹",
        url: "public/Snapchat-1309485100.jpg",
        tag: "Sabse Khaas"
      },
      {
        id: 4,
        type: "video",
        category: "Special Days 💕",
        title: "Teri Masoom Adaayein 🌷",
        date: "Dil Choo Lene Wala Pal",
        caption: "Teri yeh choti choti pyaari adaayein, yeh expressions — meri jaan, tu kitni innocent aur khoobsurat hai. 💝",
        url: "public/Snapchat-1887975541.mp4",
        tag: "Meri Princess"
      },
      {
        id: 5,
        type: "image",
        category: "Us ❤️",
        title: "Hum Dono ❤️",
        date: "Hamara Woh Din",
        caption: "Yeh tasveer sirf ek tasveer nahi — yeh ek poora ehsaas hai jo hamesha yaad rahega. Hum dono ek frame mein — mujhe aur kuch nahi chahiye. 💞",
        url: "public/hum-dono.jpg",
        tag: "Hum ❤️"
      },
      {
        id: 6,
        type: "video",
        category: "Beautiful Moments ✨",
        title: "Teri Ek Jhalak 🎥",
        date: "Dil Ka Ek Pal",
        caption: "Yeh moment mujhe hamesha yaad rahega. Teri khushi dekhna mera sabse pasandida kaam hai. 🌸",
        url: "public/Snapchat-1160906137.mp4",
        tag: "Teri Ek Clip"
      }
    ],
    nextButtonText: "Explore Our Love Story 📖✨",
  },

  // ─── 7. "Our Story" Timeline ─────────────────────────────────────
  timeline: {
    title: "Our Story ❤️",
    subtitle: "Every chapter with you has been my favorite one yet.",
    events: [
      {
        id: 1,
        badge: "Chapter 1",
        title: "How It All Started ✨",
        date: "Snapchat — The Beginning",
        description: "It started with the most simple, ordinary thing — a conversation on Snapchat. You scolded me a little because I used to send too many snaps... and honestly, I deserved it 😅. But a few days later, the ice melted and we started talking again. That tiny little argument was the beginning of everything beautiful.",
        icon: "📱",
        quote: "Who knew a little scolding would start the best chapter of my life."
      },
      {
        id: 2,
        badge: "Chapter 2",
        title: "The First Time I Saw You 🌸",
        date: "Dawoo — Our First Meet",
        description: "I still remember that day at Dawoo like it was yesterday. There you were — right in front of me. It was our very first face-to-face meeting and I actually talked to you in person for the first time. You were standing right there in front of me and my heart completely forgot how to act normal. That moment is forever locked in my memory. 🥺",
        icon: "🌸",
        quote: "I saw you and somehow my whole world felt quieter and warmer at the same time."
      },
      {
        id: 3,
        badge: "Chapter 3",
        title: "Knowing Your Day 🌸😊",
        date: "Every Little Conversation",
        description: "One of the things I genuinely love is knowing how your day went. Just asking you — 'aaj kya kiya?' — and then hearing you talk about your day, your funny little moments, what made you laugh, what annoyed you. It feels so warm and so good knowing those small details about you. And when you share something funny that happened, listening to it and talking about it together just makes everything feel lighter and happier. Those simple, everyday conversations are honestly some of my most favorite moments with you. ❤️",
        icon: "😊",
        quote: "Knowing your day makes my day a little more complete."
      },
      {
        id: 4,
        badge: "Chapter 4",
        title: "The Day I'll Never Forget 💫",
        date: "Multan — Our Third & Most Precious Meeting",
        description: "The third time we met — and honestly every single moment of that day is engraved in my heart. We walked together, talked, had ice cream and shakes, played games — and just being beside you the whole time felt like something I never wanted to end. But the one moment that I carry closest to my heart? Sitting together in the car — and holding your hand. 🤝 That one quiet moment said more than words ever could. Every minute I spent with you that day was precious to me. Not one second of it felt ordinary. I will never forget that day — not ever. ❤️",
        icon: "🤝",
        quote: "Holding your hand in that car was the most beautiful, unforgettable moment of my entire life."
      },
      {
        id: 5,
        badge: "Chapter 5",
        title: "Today & Beyond ❤️",
        date: "August 21 — Your Birthday & Our Beautiful Now",
        description: "And here we are — today. Your birthday. This moment. This is us right now, and I wouldn't trade it for anything. Whatever tomorrow holds, I want to keep writing more chapters with you, keep laughing at our blunders, keep making memories worth remembering — together.",
        icon: "🎂",
        quote: "The story is still going, and you're still my favorite part of it."
      }
    ],
    nextButtonText: "Make A Wish Under The Stars 🌙✨",
  },

  // ─── 8. Final Night Sky & Birthday Wish ───────────────────────────
  finalSurprise: {
    prelude: "If I could make one wish today...",
    wishText: "I'd wish for you to always be happy, always keep smiling, and for us to create thousands of beautiful memories together. ❤️",
    finalHeading: "Happy Birthday, {HER_NAME} ❤️",
    finalSubtitle: "You are one of the most beautiful chapters of my life.",
    interactivePrompt: "✨ Tap anywhere in the night sky to release glowing love lanterns ✨",
    replayButtonText: "Replay Our Story ❤️",
  }
};
