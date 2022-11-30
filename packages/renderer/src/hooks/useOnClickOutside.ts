import { useEffect } from 'react';

const MOUSEDOWN = 'mousedown';
const TOUCHSTART = 'touchstart';

type HandledEvents = [typeof MOUSEDOWN, typeof TOUCHSTART];
type HandledEventsType = HandledEvents[number];
type PossibleEvent = {
  [Type in HandledEventsType]: HTMLElementEventMap[Type];
}[HandledEventsType];
type Handler = (event: PossibleEvent) => void;

const currentDocument = typeof document !== 'undefined' ? document : undefined;
export const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: Handler | null,
  { document = currentDocument } = {}
) => {
  if (typeof document === 'undefined') {
    return;
  }

  useEffect(() => {
    if (!handler) {
      return;
    }

    const listener = (event: PossibleEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
