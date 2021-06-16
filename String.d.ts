/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

interface String {
    /** Performs a case-sensitive search to determine whether one string may be found within another string. */
    includes(search: string, start?: number): boolean;

    /** Determines whether a string begins with the characters of a specified string. */
    startsWith(search: string, rawPos?: number): boolean;

    /** Determines whether a string ends with the characters of a specified string. */
    endsWith(search: string, this_len?: number): boolean;

    /** Removes the leading and trailing white space and line terminator characters from a string. */
    trim(): string;

    /** Removes the leading white space from a string. */
    trimStart(): string;

    /** Removes the trailing white space from a string. */
    trimEnd(): string;
}
