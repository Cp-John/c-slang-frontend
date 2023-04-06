import { Card, Pre } from '@blueprintjs/core';
import { Ace } from 'ace-builds';
import { parseError } from 'c-slang';
import { Chapter, Variant } from 'c-slang/dist/types';
import * as React from 'react';

import { InterpreterOutput } from '../application/ApplicationTypes';
import { ExternalLibraryName } from '../application/types/ExternalTypes';
import { OutputProps } from './ReplTypes';

const ESCAPE_CHARACTERS = {
  '\\a': 'a',
  '\\b': '\b',
  '\\f': '\f',
  '\\n': '\n',
  '\\r': '\r',
  '\\t': '\t',
  '\\v': '\v',
  "\\'": "'",
  '\\"': '"',
  '\\?': '?',
  '\\\\': '\\'
}

function restoreEscapeCharacters(original: string): string {
  let result = original
  for (const toReplace in ESCAPE_CHARACTERS) {
    result = result.replaceAll(toReplace, ESCAPE_CHARACTERS[toReplace])
  }
  return result
}

export type ReplProps = DispatchProps & StateProps & OwnProps;

type StateProps = {
  output: InterpreterOutput[];
  replValue: string;
  hidden?: boolean;
  inputHidden?: boolean;
  usingSubst?: boolean;
  sourceChapter: Chapter;
  sourceVariant: Variant;
  externalLibrary: ExternalLibraryName;
  disableScrolling?: boolean;
};

type DispatchProps = {
  handleBrowseHistoryDown: () => void;
  handleBrowseHistoryUp: () => void;
  handleReplEval: () => void;
  handleReplValueChange: (newCode: string) => void;
  onFocus?: (editor: Ace.Editor) => void;
  onBlur?: () => void;
};

type OwnProps = {
  replButtons: Array<JSX.Element | null>;
};

const Repl: React.FC<ReplProps> = (props: ReplProps) => {
  const cards = props.output.map((slice, index) => (
    <Output
      output={slice}
      key={index}
      usingSubst={props.usingSubst ?? false}
    />
  ));
  return (
    <div className="Repl" style={{ display: props.hidden ? 'none' : undefined }}>
      <div className="repl-output-parent">
        {cards}
      </div>
    </div>
  );
};

export const Output: React.FC<OutputProps> = (props: OutputProps) => {
  console.log(props)
  switch (props.output.type) {
    case 'code':
      return (
        <Card>
          <Pre className="code-output">{props.output.value}</Pre>
        </Card>
      );
    case 'running':
      return (
        <Card>
          <Pre className="log-output">{props.output.consoleLogs.join('\n')}</Pre>
        </Card>
      );
    case 'result':
      // We check if we are using Stepper, so we can process the REPL results properly
      if (props.usingSubst && props.output.value instanceof Array) {
        return (
          <Card>
            <Pre className="log-output">Check out the Stepper tab!</Pre>
          </Card>
        );
      } else if (props.output.consoleLogs.length === 0) {
        return (
          <Card>
            <Pre className="result-output">{restoreEscapeCharacters(props.output.value)}</Pre>
          </Card>
        );
      } else {
        return (
          <Card>
            <Pre className="log-output">{props.output.consoleLogs.join('\n')}</Pre>
            <Pre className="result-output">{props.output.value}</Pre>
          </Card>
        );
      }
    case 'errors':
      if (props.output.consoleLogs.length === 0) {
        return (
          <Card>
            <Pre className="error-output">{parseError(props.output.errors)}</Pre>
          </Card>
        );
      } else {
        return (
          <Card>
            <Pre className="error-output">{parseError(props.output.errors)}</Pre>
            <br />
            <Pre className="log-output">{props.output.consoleLogs.join('\n')}</Pre>
          </Card>
        );
      }
    default:
      return <Card>''</Card>;
  }
};

/* Override handler, so does not trigger when focus is in editor */
// const handlers = {
//   goGreen: () => {}
// };

export default Repl;
