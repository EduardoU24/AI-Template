
import { DATA, IAppTerm, IAppTermFlags, TermType } from '../data/app-terms.ts';
import { createService, registerInitialData } from './index.ts';

const COLLECTION = 'app-terms';

registerInitialData(COLLECTION, DATA);

const base = createService<IAppTerm>(COLLECTION);

export const AppTermService = {
  ...base,
  getLatestByType: async (type: TermType) => {
    const res = await base.findAll();
    const matches = (res.data || []).filter(t => t.type === type && (t.flags & IAppTermFlags.IsActive) !== 0);
    const sorted = matches.sort((a, b) => b.version.localeCompare(a.version));
    return { ...res, data: sorted[0] || null };
  }
};
