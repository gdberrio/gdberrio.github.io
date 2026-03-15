export const SITE = {
  website: "https://gdberrio.github.io/",
  author: "Guilherme Diaz-Berrio",
  profile: "https://github.com/gdberrio",
  desc: "Personal blog by Gui Diaz-Berrio — economist, data scientist, and founder of Pinemarsh. Posts on marketing science, economics, data, engineering, and whatever else is worth thinking through. Works in progress, not polished takes.",
  title: "Gui Diaz-Berrio's Corner",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true,
  editPost: {
    enabled: true,
    text: "Suggest changes",
    url: "https://github.com/gdberrio/gdberrio.github.io/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr",
  lang: "en",
  timezone: "Europe/London",
} as const;
