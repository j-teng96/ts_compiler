import * as ts from 'typescript'

export const scanner = ts.createScanner(ts.ScriptTarget.Latest, false);//false表示保留杂项

export function initializeState(text: string) {
  scanner.setText(text);
  scanner.setOnError((message: ts.DiagnosticMessage, length: number) => {
    console.error(message);
  });
  scanner.setScriptTarget(ts.ScriptTarget.ES5);
  scanner.setLanguageVariant(ts.LanguageVariant.Standard);
  console.log('scanner', scanner.getText());
}