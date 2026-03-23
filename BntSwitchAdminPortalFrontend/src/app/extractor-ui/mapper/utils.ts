import { cloneDeepWith, isObject, toLower, some } from 'lodash';
export const REGEX_UNDERSCORE_ALPHANUMERIC_REGEX = /^[a-zA-Z0-9_\s]+$/;
export const REGEX_ALPHABET_WITH_UNDERSCORE = /^[a-zA-Z_.]+$/;

export class Utils {
  static newData(row) {
    // return JSON.parse(JSON.stringify(row));
    return row;
  }

  static checkAlphaWithUnderndDash(text) {
    const regex = /^[a-zA-Z0-9-_]+$/;
    return regex.test(text);
  }

  static deleteWarning(field?: string) {
    const message = 'Do you want to delete';
    return `${message} ${field} ?`;
  }

  static submitMessage() {
    const message = 'Are you sure to submit key';
    return `${message}?`;
  }

  static isFileNameExist(elementContainer: any[], valueToFind: string): boolean {
    return elementContainer.some(({ name }) => name === valueToFind);
  }

  static schemaSlugify(string: string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
    const p = new RegExp(a.split('').join('|'), 'g');
    return string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }

  static transFilters(filters): string {
    return Object.keys(filters)
      .map(item => {
        return item + ':' + filters[item];
      })
      .join(',');
  }

  static numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode === 45 || charCode === 95) {
      return true;
    } else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  static checkValidField(text): boolean {
    return REGEX_ALPHABET_WITH_UNDERSCORE.test(text);
  }

  static maskJson(
    collection,
    { ignoreCase = false, replacement = 'xxxxxxxxxx', start = 6, end = 4 } = {},
  ) {
    return function (values) {
      return cloneDeepWith(values, (value, key) => {
        if (
          some(collection, item => (ignoreCase ? toLower(key) === toLower(item) : key === item))
        ) {
          const startString = value.slice(0, start);
          const endString = value.slice(value.length - end);
          return startString + replacement + endString;
        }
        if (isObject(value)) {
          return;
        }
        return value;
      });
    };
  }
}
