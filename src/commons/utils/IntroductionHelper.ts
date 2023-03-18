import { Chapter, Variant } from 'calc-slang/dist/types';

import { Links } from './Constants';

const MAIN_INTRODUCTION = `
This is a C language interpreter, enjoy programming! 
`;

const HOTKEYS_INTRODUCTION = `
Currently NOT SUPPORTED: struct, function pointers, arrays (use pointers instead).

In the editor on the left, you can use the [_Ace keyboard shortcuts_](${Links.aceHotkeys}) 
and also the [_Source Academy keyboard shortcuts_](${Links.sourceHotkeys}).

Developer: Cao Peng, Contact: e0376984@u.nus.edu
`;


const generateIntroductionText = (sourceChapter: Chapter, sourceVariant: Variant) => {
  return (
    MAIN_INTRODUCTION +  HOTKEYS_INTRODUCTION
  );
};

export const generateSourceIntroduction = (sourceChapter: Chapter, sourceVariant: Variant) => {
  return generateIntroductionText(sourceChapter, sourceVariant);
};
