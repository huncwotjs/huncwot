// Copyright 2020 Zaiste & contributors. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const encode = encodeURIComponent;
// eslint-disable-next-line no-control-regex
const CookieCutter = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

interface Options {
  maxAge?: number
  domain?: string
  path?: string
  expires?: Date
  httpOnly?: boolean
  secure?: string
  sameSite?: string | boolean
}

export default class Cookie {
  static create(name: string, value: string, { maxAge, domain, path, expires, httpOnly, secure, sameSite }: Options) {
    if (name && !CookieCutter.test(name)) throw new TypeError('cookie name is invalid');

    const content = encode(value);
    if (content && !CookieCutter.test(content)) throw new TypeError('cookie value is invalid');

    let cookie = `${name}=${content}`;

    if (maxAge) {
      if (!Number.isInteger(maxAge)) throw new Error('maxAge must be a number');

      cookie += `; Max-Age=${Math.floor(maxAge)}`;
    }

    if (domain) {
      if (!CookieCutter.test(domain)) throw new TypeError('domain is invalid');

      cookie += `; Domain=${domain}`;
    }

    if (path) {
      if (!CookieCutter.test(path)) throw new TypeError('path is invalid');

      cookie += `; Path=${path}`;
    }

    if (expires) {
      if (typeof expires.toUTCString !== 'function') throw new TypeError('expires is invalid');

      cookie += `; Expires=${expires.toUTCString()}`;
    }

    if (httpOnly) cookie += '; HttpOnly';
    if (secure) cookie += '; Secure';

    if (sameSite) {
      let _sameSite = typeof sameSite === 'string' ? sameSite.toLowerCase() : sameSite;

      if (_sameSite === true) cookie += '; SameSite=Strict';
      else if (_sameSite === 'lax') cookie += '; SameSite=Lax';
      else if (_sameSite === 'strict') cookie += '; SameSite=Strict';
      else throw new TypeError('sameSite is invalid');
    }

    return cookie;
  }

  static destroy(name: string) {
    return name;
  }
}

