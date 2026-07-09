export async function getUserDisplayName(): Promise<string> {
  const { getPreferences } = await import('./preferences');
  const prefs = await getPreferences();
  return prefs.country ? `Apprenant · ${prefs.country}` : 'Apprenant FinLearn';
}
