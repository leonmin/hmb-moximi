/* eslint-disable */
import Excel from 'exceljs'
import FileSaver from 'file-saver'
const getExcel = async file => {
  if (file) {
    const workbook = new Excel.Workbook()
    await workbook.xlsx.load(file)
    const worksheet = workbook.getWorksheet(1)
    return worksheet
  }
  return null
}

// 按照数组(表中数据需和数组顺序一致)
// 比如 ['name', 'age', 'sex'] => | 姓名 | 年龄 | 性别 |
export const excel2jsonByArr = async (file, arr) => {
  const worksheet = await getExcel(file)
  if (worksheet && typeof arr === 'object' && typeof arr.length === 'number') {
    const list = []
    worksheet.eachRow((row, r) => {
      if (r > 1) {
        const item = {}
        row.eachCell((col, c) => {
          const { value = '' } = col || {}
          item[arr[c - 1]] = value
        })
        list.push(item)
      }
    })
    return list
  }
  return []
}

// 按照映射
// 比如 {'姓名': 'name', '年龄': 'age', '性别': 'sex'}
export const excel2jsonByMap = async (file, map) => {
  const worksheet = await getExcel(file)
  if (worksheet && map !== null && typeof map === 'object') {
    let arr = []
    const list = []
    worksheet.eachRow((row, r) => {
      if (r === 1) {
        arr = row.values
      } else if (r > 1) {
        const item = {}
        row.eachCell((col, c) => {
          const { value = '' } = col || {}
          const prop = map[arr[c] || ''] || ''
          if (prop) {
            item[prop] = value
          }
        })
        list.push(item)
      }
    })
    return list
  }
  return []
}

export const excel2json = async (file, props) => {
  // 获取表格数据
  let err = null
  const worksheet = await getExcel(file)
  if (worksheet && props !== null && typeof props === 'object') {
    const list = [] // 判断数组还是映射
    const isArray = typeof props.length === 'number'
    let arr = []
    let pass = true
    worksheet.eachRow((row, r) => {
      if (r === 1) {
        // 表头对应的属性值:
        // 如果是数组, 直接使用传进来的数组 ['t1', 't2', ..]
        // 如果是映射, 使用表格数据中第一行 [undefind, 't1', 't2', ..]
        arr = isArray ? props : row.values // 必须项 验证
        pass = isArray ? true : Object.keys(props).every(e => arr.includes(e))
        if (!pass && !isArray) {
          const head = Object.keys(props).join(' | ')
          err = '请检查表格项: ' + '| ' + head + ' |'
        }
      } else if (r > 1 && pass) {
        const item = {}
        row.eachCell((col, c) => {
          let { value = '' } = col || {}
          const key = isArray ? arr[c - 1] : props[arr[c]]
          if (key) {
            value = String(value)
            item[key] = value ? value.trim() : ''
          }
        })
        const fkey = isArray ? arr[0] : props[arr[1]]
        if (item[fkey]) {
          list.push(item)
        }
      }
    })
    return [err, list]
  }
  return [null, []]
}

export const json2excel = async (name, columns, json) => {
  const EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const workbook = new Excel.Workbook()
  const worksheet = workbook.addWorksheet('sheet1')
  worksheet.columns = columns
  if (json && json.length > 0) {
    json.map(obj => {
      // 文本格式
      Object.keys(obj).map(prop => {
        obj[prop] = '\t' + obj[prop]
      })
      worksheet.addRow(obj)
    })
    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: EXCEL_TYPE })
      FileSaver.saveAs(blob, name)
    })
  }
}
