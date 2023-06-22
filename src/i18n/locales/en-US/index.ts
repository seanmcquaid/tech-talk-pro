/* eslint "sort-keys": ["warn", "asc", {"caseSensitive": false, "natural": false, "minKeys": 2}] */

const enUSLocale = {
  App: {
    appName: 'Tech Talk Pro',
    companyName: '© {{year}} SeanMcQuaidCode',
  },
  Dashboard: {
    talksCardInfo: 'Check out your current talks or create a new one here!',
    talksCardTitle: 'Talks',
  },
  Home: {
    signIn: 'Sign In',
    subtitle:
      'The easiest way for you to prepare to apply to your first tech conference!',
  },
} as const;

export default enUSLocale;
