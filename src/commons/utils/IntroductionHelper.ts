import { Chapter, Variant } from 'c-slang/dist/types';

import { Links } from './Constants';

const MAIN_INTRODUCTION = `
This is a C language interpreter, which supports Syntax Check, Type Check, Memory Management, Heap Visualization (_printHeap_), Pointer Arithmetic, etc. Enjoy!\n
NOT supported: preprocessor directives, function pointer\n
supported data types: _char(1 byte)_, _int(4)_, _float(4)_, _double_(interpreted as _float_), _pointer(4)_, _array_, _struct_\n
`;

const HOTKEYS_INTRODUCTION = `
Tips:
  1. Call _printEnv()_ to display what is accessable in the current environment
  2. The editor on the left supports [_Ace keyboard shortcuts_](${Links.aceHotkeys}) 
    and [_Source Academy keyboard shortcuts_](${Links.sourceHotkeys}).

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
