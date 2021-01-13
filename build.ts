import { promises as fs } from 'fs'
import Path from 'path'
import MDIT from 'markdown-it'

const MD = MDIT('commonmark')

const readDirR = async (dir: string, files: string[] = []) => {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    const jobs: Array<Promise<any>> = []
    for (const entry of entries) {
        if (entry.isDirectory()) jobs.push(readDirR(Path.join(dir, entry.name), files))
        if (entry.isFile()) files.push(Path.join(dir, entry.name))
    }
    await jobs
    return files
}

const wrapHtml = (body: string) => [
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    '<title>( ͡° ͜ʖ ͡°)</title>',
    '</head>',
    '<body>',
    '',
    body,
    '</body>',
    '</html>',
].join('\n')

;(async () => {
    const files = await readDirR('docs')
    await Promise.all(files.map(async file => {
        const text = String(await fs.readFile(file))
        switch (Path.extname(file)) {
        case '.html': {
            if (text.startsWith('<!-- keep -->')) return
            return await fs.unlink(file)
        }
        case '.md': {
            const html = wrapHtml(MD.render(text))
            return await fs.writeFile(file.replace(/\.md$/, '.html'), html)
        }
        default:
            console.warn('Unknown file', file)
        }
    }))
})().catch(reason => {
    console.error(reason)
    process.exit(1)
})
