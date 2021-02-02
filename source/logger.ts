import util from 'util';
import color from 'chalk';
import { parse } from 'url';
import stackParser from 'error-stack-parser';
import httpstatus from 'http-status';

import * as explain from './explainer';

const displayStatusCode = statusCode =>
  ({
    2: color`{green ${statusCode}}`,
    3: color`{cyan ${statusCode}}`,
    4: color`{blue ${statusCode}}`
  }[~~(statusCode / 100)]);

export default class Logger {
  static printRequestResponse(context) {
    const { request, response, params } = context;
    const { method } = request;
    const { pathname, query } = parse(context.request.url, true); // TODO Test perf vs RegEx
    const { statusCode } = response;

    // obfuscate certain params
    const SensitiveParams = ['password']
    const paramsCopy = {...params};
    for (const p of SensitiveParams) {
      if (paramsCopy[p]) paramsCopy[p] = '(redacted)'
    }

    console.log(
      color`┌ {magenta ${method}} {bold ${pathname}} → ${displayStatusCode(statusCode)} ${
        httpstatus[statusCode]
      }
└ {gray Params}
${util.inspect(paramsCopy, { compact: false, colors: true, sorted: true }).slice(2, -2)}`
    );
  }

  static printError(error, layer = 'General') {
    console.error(
      color`  {bold.red Error} {bold.underline ${error.message}}
  {gray Explanation} \n  ${explain.forError(error)}
\n  {gray Stack trace}`
    );

    for (let message of stackParser.parse(error)) {
      console.error(color`  - {yellow ${message.functionName}}
    {bold ${message.fileName}}:{bold.underline.cyan ${message.lineNumber}}`);
    }
  }
}
