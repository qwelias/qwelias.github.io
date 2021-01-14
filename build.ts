import { promises as fs } from 'fs'
import Path from 'path'
import MDIT from 'markdown-it'
import MA from 'markdown-it-anchor'

const MD = MDIT('commonmark', {
    html: true,
    linkify: true,
    typographer: true,
}).use(MA)

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

const wrapHtml = (main: string, title: string = '') => `
<!DOCTYPE html>
<html>
    <head>
        <title>${title}</title>
        <meta name=viewport content="width=device-width, initial-scale=1">
        <link href=/css/readable.css rel=stylesheet />
        <script type=module src=/js/dark-toggle.js></script>
        <script type=module src=/js/details-toggle.js></script>
    </head>
    <body>
        <header>
        </header>
        <main>
            ${main}
        </main>
    </body>
</html>
`

;(async () => {
    await Promise.all(((await readDirR('docs')).filter(f => f.endsWith('.html')).map(async file => {
        const text = String(await fs.readFile(file))
        if (text.startsWith('<!-- keep -->')) return
        return await fs.unlink(file)
    })))

    await Promise.all(((await readDirR('md')).map(async file => {
        const text = String(await fs.readFile(file))
        const name = file.slice(3, -3)
        const html = wrapHtml(MD.render(text), Path.basename(name))
        return await fs.writeFile('docs/' + name + '.html', html)
    })))
})().catch(reason => {
    console.error(reason)
    process.exit(1)
})
