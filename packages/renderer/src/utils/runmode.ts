import { languages } from '@codemirror/language-data';
import type { Language, LanguageDescription } from '@codemirror/language';
import { highlightTree } from '@lezer/highlight';

type RunModeCallback = (
  text: string,
  style: string | null,
  from: number,
  to: number
) => void;

function runmode(
  textContent: string,
  language: Language,
  callback: RunModeCallback
): void {
  const tree = language.parser.parse(textContent);
  let pos = 0;
  highlightTree(tree, { style: ([]) => '' }, (from, to, classes) => {
    if (from > pos) {
      callback(textContent.slice(pos, from), null, pos, from);
    }
    callback(textContent.slice(from, to), classes, from, to);
    pos = to;
  });
  if (pos !== tree.length) {
    callback(textContent.slice(pos, tree.length), null, pos, tree.length);
  }
}

export function findLanguage(langName: string): LanguageDescription | null {
  const i = languages.findIndex((lang: LanguageDescription) => {
    if (lang.alias.indexOf(langName) >= 0) {
      return true;
    }
  });
  if (i >= 0) {
    return languages[i];
  } else {
    return null;
  }
}

export async function getLanguage(langName: string): Promise<Language | null> {
  const desc = findLanguage(langName);
  if (desc) {
    const langSupport = await desc.load();
    return langSupport.language;
  } else {
    return null;
  }
}

export default runmode;
