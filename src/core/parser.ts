export function parseWingetOutput(rawOutput: string): Record<string, string>[] {
	const lines = rawOutput.split('\n').map(l => l.trimEnd())
	const separatorIndex = lines.findIndex(line => line.startsWith('---'))
	if (separatorIndex === -1 || separatorIndex === 0) {
		return []
	}
	const headerLine = lines[separatorIndex - 1]
	const dataLines = lines.slice(separatorIndex + 1)
	const columns: { name: string; start: number; end?: number }[] = []
	const wordRegex = /\S+/g
	let match: RegExpExecArray | null = wordRegex.exec(headerLine)
	while (match !== null) {
		columns.push({
			name: match[0].toLowerCase(),
			start: match.index,
		})
		match = wordRegex.exec(headerLine)
	}
	for (let i = 0; i < columns.length - 1; i++) {
		columns[i].end = columns[i + 1].start
	}
	const results: Record<string, string>[] = []
	for (const line of dataLines) {
		if (!line.trim()) continue
		const entry: Record<string, string> = {}
		for (const col of columns) {
			const text = col.end
				? line.substring(col.start, col.end)
				: line.substring(col.start)
			entry[col.name] = text.trim()
		}
		results.push(entry)
	}
	return results
}
