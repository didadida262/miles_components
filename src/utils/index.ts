/**
 * 工具函数集合
 */

// 类型检查工具
export const isString = (value: any): value is string => typeof value === 'string'
export const isNumber = (value: any): value is number => typeof value === 'number'
export const isBoolean = (value: any): value is boolean => typeof value === 'boolean'
export const isFunction = (value: any): value is Function => typeof value === 'function'
export const isObject = (value: any): value is object => typeof value === 'object' && value !== null
export const isArray = (value: any): value is any[] => Array.isArray(value)

// 字符串工具
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const kebabCase = (str: string): string => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export const camelCase = (str: string): string => {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

// 样式工具
export const addClass = (element: HTMLElement, className: string): void => {
  if (element && className) {
    element.classList.add(className)
  }
}

export const removeClass = (element: HTMLElement, className: string): void => {
  if (element && className) {
    element.classList.remove(className)
  }
}

export const hasClass = (element: HTMLElement, className: string): boolean => {
  return element && element.classList.contains(className)
}

// 事件工具
export const stopPropagation = (event: Event): void => {
  event.stopPropagation()
}

export const preventDefault = (event: Event): void => {
  event.preventDefault()
}

// 防抖函数
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func(...args), wait)
  }
}

// 节流函数
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  let previous = 0
  
  return (...args: Parameters<T>) => {
    const now = Date.now()
    const remaining = wait - (now - previous)
    
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func(...args)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now()
        timeout = null
        func(...args)
      }, remaining)
    }
  }
}

// 生成唯一ID
export const generateId = (prefix: string = 'component'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

// 深度合并对象
export const deepMerge = (target: any, source: any): any => {
  const result = { ...target }
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (isObject(source[key]) && isObject(result[key])) {
        result[key] = deepMerge(result[key], source[key])
      } else {
        result[key] = source[key]
      }
    }
  }
  
  return result
}

// 格式化数字
export const formatNumber = (num: number, decimals: number = 0): string => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}

// 格式化文件大小
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
