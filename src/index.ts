import * as ts from "typescript";
import { compile } from './simpleCompiler';
import { initializeState, scanner } from './simpleScanner';
import { formatSyntaxKind } from './format'

const source = "let x: string  = 'string'".trim();

//这部分用于scanner将内容转换成token流
// initializeState(source)
// var token = scanner.scan();
// while (token != ts.SyntaxKind.EndOfFileToken) {
//   let currentToken = formatSyntaxKind(token);
//   let tokenStart = scanner.getStartPos();
//   token = scanner.scan();
//   let tokenEnd = scanner.getStartPos();
//   console.log(currentToken, tokenStart, tokenEnd);
// }

const sourceFile = ts.createSourceFile('./source.ts', source, ts.ScriptTarget.ESNext, true);
console.log(sourceFile)
//这部分完成了对于输入的代码进行编译，输出js代码的作用，本质上还是createProgram
// let result = ts.transpileModule(source, {
//   compilerOptions: { module: ts.ModuleKind.CommonJS }
// });
// console.log(JSON.stringify(result));

//compiler实践，编译index.ts
// compile(process.argv.slice(1), {
//   noEmitOnError: true,
//   noImplicitAny: true,
//   target: ts.ScriptTarget.ES5,
//   module: ts.ModuleKind.CommonJS
// });