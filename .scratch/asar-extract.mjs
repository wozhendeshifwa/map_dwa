import fs from 'node:fs'

const archive = 'C:\\Users\\27263\\AppData\\Local\\Programs\\DeepSeek Harness\\resources\\app.asar'
const fd = fs.openSync(archive, 'r')
const sizeBuf = Buffer.alloc(8)
fs.readSync(fd, sizeBuf, 0, 8, 0)
const headerSize = sizeBuf.readUInt32LE(4)
const headerBuf = Buffer.alloc(headerSize)
fs.readSync(fd, headerBuf, 0, headerSize, 8)
const dataStart = 8 + headerSize

// header payload: skip pickle size, then string length, then JSON text
let start = -1
for (let i = 0; i < 64; i += 1) {
  if (headerBuf[i] === 0x7b /* { */) {
    start = i
    break
  }
}
const text = headerBuf.subarray(start).toString('utf8').replace(/\0+$/u, '')
const header = JSON.parse(text)

function readNode(node) {
  const buf = Buffer.alloc(Number(node.size))
  fs.readSync(fd, buf, 0, Number(node.size), dataStart + Number(node.offset))
  return buf
}

function get(path) {
  const parts = path.split('/')
  let node = header
  for (const p of parts) {
    node = node.files?.[p] ?? node[p]
    if (!node) break
  }
  if (!node) throw new Error('missing ' + path)
  return node
}

const out = process.argv[2]
const entry = process.argv[3]
const node = get(entry)
if (node.files) throw new Error('is directory')
fs.writeFileSync(out, readNode(node))
console.log(out, node.size)
fs.closeSync(fd)
