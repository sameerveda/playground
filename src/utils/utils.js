import { Observable } from 'rxjs';
import { readable } from 'svelte/store';

/**
 * @template T
 * @param {Observable<T>} observable$
 * @returns {import("svelte/store").Readable<T>}
 */
export const toReadable = observable$ =>
  readable(null, set => {
    const sub = observable$.subscribe(set);
    return () => sub.unsubscribe();
  });
