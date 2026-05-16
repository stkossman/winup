export function parseWingetOutput(rawOutput: string): Record<string, string>[] {
	const lines = rawOutput.split('\n').map(l => l.replace(/\r/g, '').trim())

	const separatorIndex = lines.findIndex(line => /^-{10,}$/.test(line))
	if (separatorIndex === -1) {
		return []
	}

	const dataLines = lines.slice(separatorIndex + 1)
	const results: Record<string, string>[] = []

	for (const line of dataLines) {
		const cleanLine = line.replace(/^[^a-zA-Z0-9(]+/, '').trim()
		if (!cleanLine) continue

		if (
			/^\d+\s+upgrades/i.test(cleanLine) ||
			cleanLine.includes('upgrades available')
		)
			continue
		if (
			cleanLine.startsWith('1 package') ||
			cleanLine.includes('cannot be determined')
		)
			continue

		const parts = cleanLine.split(/\s{2,}/)

		if (parts.length >= 4) {
			results.push({
				name: parts[0],
				id: parts[1],
				version: parts[2],
				available: parts[3],
				source: parts[4] || 'winget',
			})
		}
	}

	return results
}
