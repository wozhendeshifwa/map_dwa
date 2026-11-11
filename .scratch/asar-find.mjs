import fs from 'node:fs'

const archive = 'C:\\Users\\27263\\AppData\\Local\\Programs\\DeepSeek Harness\\resources\\app.asar'
const fd = fs.openSync(archive, 'r')
const sizeBuf = Buffer.alloc(8)
fs.readSync(fd, sizeBuf, 0, 8, 0)
const headerSize = sizeBuf.readUInt32LE(4)
const headerBuf = Buffer.alloc(headerSize)
fs.readSync(fd, headerBuf, 0, headerSize, 8)
let start = 0
for (let i = 0; i < 64; i += 1) if (headerBuf[i] === 0x7b) { start = i; break }
const header = JSON.parse(headerBuf.subarray(start).toString('utf8').replace(/\0+$/u, ''))
console.log('top level:', Object.keys(header))
const target = process.argv[2]
const found = []
function walk(node, path) {
  if (!node || typeof node !== 'object') return
  if (node.files) {
    for (const [key, child] of Object.entries(node.files)) {
      const childPath = path ? `${path}/${key}` : key
      if (childPath.endsWith(target)) found.push(childPath)
      walk(child, childPath)
    }
  }
}
walk(header, '')
console.log(found.slice(0, 20))
fs.closeSync(fd)
