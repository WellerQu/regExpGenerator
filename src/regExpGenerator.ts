export interface Sample {
  name: string
  value: string
  startIndex: number
}

export interface Field {
  groupIndex: number,
  standaloneExpr: string
}

type FieldName = string
type RegExpStr = string
type NamesMapping = Record<FieldName, Field | undefined>

enum Level {
  fuzzy = 'fuzzy',
  normal = 'normal',
  exact = 'exact'
}

export interface Options {
  level?: keyof typeof Level,
  separator?: string
}

export interface Result {
  expr: RegExpStr,
  names: NamesMapping,
}

function isNumber(ch: string): boolean {
  // 0 ~ 9
  const code = ch.charCodeAt(0)
  return (code >= 0x30 && code <= 0x39)
}

function isWord(ch: string): boolean {
  // A ~ Z || a ~ z
  const code = ch.charCodeAt(0)
  return (code >= 0x41 && code <= 0x5A) || (code >= 0x61 && code <= 0x7A)
}

function isUnicode(ch: string): boolean {
  // 255+
  const code = ch.charCodeAt(0)
  return code > 255
}

function isSeparator(ch: string): boolean {
  return !isNumber(ch) && !isWord(ch) && !isUnicode(ch)
}

function isRegExpMetaChar(ch: string): boolean {
  if (ch === '') {
    return false
  }

  return !!~'\\^$*+?{}.|[]()'.indexOf(ch)
}

function characterCount(slice: string, ch: string): number {
  return slice.split('').reduce((acc, item) => {
    return item === ch ? acc + 1 : acc
  }, 0)
}

function transformCharacter(value: string, level: Level): string {
  if (level === Level.exact) {
    return value
  }

  const expr = value
    .split('')
    .map(ch => {
      if (isNumber(ch)) {
        return `\\d`
      }
      if (isWord(ch)) {
        return `\\w`
      }
      if (isRegExpMetaChar(ch)) {
        return `\\${ch}`
      }
      if (isUnicode(ch)) {
        return `[\\u4e00-\\uffff]`
      }

      return ch
    })
    .join('')

  if (level === Level.normal) {
    return expr
  }

  return expr
    .replace(/(\\w)+/g, "\\w+")
    .replace(/(\\d)+/g, "\\d+")
    .replace(/(\[\\u4e00-\\uffff\]){2,}/g, "[\\u4e00-\\uffff]+")
}

function findSeparator(slice: string, sep?: string): [string, number] {
  if (sep) {
    return [sep, characterCount(slice, sep[0])]
  }

  // 倒序查找最近的界定符作为分隔符
  const chs = slice.split('')
  let separator = ''
  for (let i = chs.length - 1; i >= 0; i--) {
    if (isSeparator(chs[i])) {
      separator = chs[i]
      break
    }
  }

  return [separator, characterCount(slice, separator)]
}

export function generate(raw: string, samples: Sample[], options?: Options): Result {
  const opts: Required<Options> = {
    level: options?.level ?? 'fuzzy',
    separator: options?.separator ?? ''
  }

  const emptyResult: Result = {
    expr: '.*',
    names: {}
  }

  if (samples.length === 0 || !raw || !raw.trim()) {
    return emptyResult
  }

  // 将 samples 按 startIndex 排序, 因为这将影响到正则匹配的顺序
  const sortedSamples = samples
    .slice(0)
    .sort((a, b) => a.startIndex - b.startIndex)

  const result: Result = {
    expr: '',
    names: sortedSamples.reduce((acc, item, index) => {
      acc[item.name] = { groupIndex: index + 1, standaloneExpr: '' }
      return acc
    }, {} as NamesMapping)
  }

  const generateHandler = (fromHead = false) => (item: Sample, index: number, samples: Sample[]) => {
    const startIndex = index === 0 ? 0 : (samples[index - 1].startIndex + samples[index - 1].value.length)
    const slice = raw.slice(fromHead ? 0 : startIndex, item.startIndex)
    const [separator, count] = findSeparator(slice, opts.separator)

    const chs = isRegExpMetaChar(separator) ? `\\${separator}` : separator

    // #region 生成前缀正则表达式
    const prevExpr = count === 0 ? '' : `(?:[^${chs}]*${chs}){${count}}`
    // #endregion

    // #region 生成中间正则表达式
    const lastIndex = separator === '' ? 0 : slice.lastIndexOf(separator)
    const middleExpr = lastIndex === slice.length - 1 ? '' : transformCharacter(slice.slice(lastIndex + 1), Level.fuzzy)
    const notGreedExpr = middleExpr.endsWith('+') ? `${middleExpr}?` : middleExpr
    // #endregion

    // #region 生成目标正则表达式
    const targetExpr = `(${transformCharacter(item.value, Level[opts.level])})`
    // #endregion

    return prevExpr + notGreedExpr + targetExpr
  }

  const exprs = sortedSamples.map(generateHandler(false))
  const standaloneExprs = sortedSamples.map(generateHandler(true))

  result.expr = ('^' + exprs.join(''))
  result.names = sortedSamples.reduce((acc, sample, index) => {
    acc[sample.name] = {
      groupIndex: index + 1,
      standaloneExpr: ('^' + standaloneExprs[index])
    }
    return acc
  }, {} as NamesMapping)

  return result
}