/* eslint "sort-keys": ["warn", "asc", {"caseSensitive": false, "natural": false, "minKeys": 2}] */

const enUSLocale = {
  App: {
    appName: 'Tech Talk Pro',
    companyName: '© {{year}} SeanMcQuaidCode',
  },
  ConfigurePage: {
    goToNextPage: 'Go to next page',
    minutes: ' {{numberOfMinutes}} minutes',
    subtitle:
      'Before we get into the nitty gritty, provide some basic info about the topic and how long you would like the talk to be!',
    title: 'Configure Your New Talk',
  },
  DashboardPage: {
    talksCardInfo: 'Check out your current talks or create a new one here!',
    talksCardTitle: 'Talks',
    title: 'Dashboard',
  },
  HomePage: {
    signIn: 'Sign In',
    subtitle:
      'The easiest way for you to prepare to apply to your first tech conference!',
  },
  NotFoundPage: {
    goHome: 'Go Home',
    title: 'Page Not Found',
  },
  TalksPage: {
    createNewTalk: 'Create New Talk',
    createNewTalkInfo:
      'Go through our flow and create a new talk to submit to conferences!',
    title: 'Talks',
  },
} as const;

export default enUSLocale;
