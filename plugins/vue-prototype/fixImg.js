export default function (img, paramsStr) {
  if (typeof img !== 'string' || !img) {
    return ''
  }

  if (!paramsStr) {
    return img
  }

  if (img.indexOf('?') > 0) {
    return `${img}&${paramsStr}`
  } else {
    return `${img}?${paramsStr}`
  }
}
