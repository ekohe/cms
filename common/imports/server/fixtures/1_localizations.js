import { Localizations } from '../../collections'

export default loadLocalizationsFixtures = () => {
  if (Localizations.find().count() > 0) {return }

  console.log("Loading default localizations...");

  Localizations.insert({
    name: 'English',
    native_name: 'English',
    locale: 'en',
    default: true,
    createdAt: new Date()
  });

  Localizations.insert({
    name: 'French',
    native_name: 'Français',
    locale: 'fr',
    default: false,
    createdAt: new Date()
  });

  Localizations.insert({
    name: 'Chinese',
    native_name: '中文',
    locale: 'cn',
    default: false,
    createdAt: new Date()
  });

  Localizations.insert({
    name: 'Japanese',
    native_name: '日本語',
    locale: 'jp',
    default: false,
    createdAt: new Date()
  });
}
