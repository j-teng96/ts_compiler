import * as ts from "typescript";

function compareComparableValues(a:any, b:any) {
  return a === b ? 0 /* EqualTo */ :
    a === undefined ? -1 /* LessThan */ :
      b === undefined ? 1 /* GreaterThan */ :
        a < b ? -1 /* LessThan */ :
          1 /* GreaterThan */;
}
/**
* Compare two numeric values for their order relative to each other.
* To compare strings, use any of the `compareStrings` functions.
*/
function compareValues(a:any, b:any) {
  return compareComparableValues(a, b);
}
function stableSortIndices(array:any, indices:any, comparer:any) {
  // sort indices by value then position
  indices.sort(function (x:any, y:any) { return comparer(array[x], array[y]) || compareValues(x, y); });
}
function stableSort(array:any, comparer:any) {
  var indices = array.map(function (_:any, i:any) { return i; });
  stableSortIndices(array, indices, comparer);
  return indices.map(function (i:any) { return array[i]; });
}

function getEnumMembers(enumObject:any) {
  var result = [];
  for (var name in enumObject) {
    var value = enumObject[name];
    if (typeof value === "number") {
      result.push([value, name]);
    }
  }
  return stableSort(result, function (x:any, y:any) { return compareValues(x[0], y[0]); });
}

function formatEnum(value:any, enumObject:any, isFlags:any) {
  if (value === void 0) { value = 0; }
  var members = getEnumMembers(enumObject);
  if (value === 0) {
      return members.length > 0 && members[0][0] === 0 ? members[0][1] : "0";
  }
  if (isFlags) {
    var result = "";
    var remainingFlags = value;
    for (var i = members.length - 1; i >= 0 && remainingFlags !== 0; i--) {
      var _a = members[i], enumValue = _a[0], enumName = _a[1];
      if (enumValue !== 0 && (remainingFlags & enumValue) === enumValue) {
        remainingFlags &= ~enumValue;
        result = "" + enumName + (result ? "|" : "") + result;
      }
    }
    if (remainingFlags === 0) {
      return result;
    }
  }
  else {
    for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
      var _b = members_1[_i], enumValue = _b[0], enumName = _b[1];
      if (enumValue === value) {
        return enumName;
      }
    }
  }
  return value.toString();
}

export function formatSyntaxKind(kind: ts.SyntaxKind | undefined): string {
  return formatEnum(kind, (<any>ts).SyntaxKind, /*isFlags*/ false);
}