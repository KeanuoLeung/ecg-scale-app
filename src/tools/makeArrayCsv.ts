function makeArrayCsv(
  arr: Record<string, number | boolean | string | string[] | number[]>[]
): string {
  if (arr.length === 0) {
    return '';
  }
  const headers = Object.keys(arr[0]);
  const result = `${headers}\n`;
  const rows = arr
    .map((row) =>
      headers
        .map((key) => {
          if (Array.isArray(row[key])) {
            return (row[key] as any[]).join('|');
          }
          return row[key];
        })
        .join(',')
    )
    .join('\n');
  return `${result}${rows}`;
}

export default makeArrayCsv;
