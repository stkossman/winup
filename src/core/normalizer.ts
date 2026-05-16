import { PackageEntry } from '../models/package.js'

export function normalizePackages(
	rawPackages: Record<string, string>[],
): PackageEntry[] {
	const packageMap = new Map<string, PackageEntry>()

	for (const raw of rawPackages) {
		const id = raw['id']
		const availableVersion = raw['available']

		if (!id || !availableVersion) continue

		const installedVersion = raw['version'] || ''
		const source = raw['source'] || ''
		const name = raw['name'] || id

		const isUnknownVersion =
			installedVersion.toLowerCase().includes('unknown') ||
			availableVersion.toLowerCase().includes('unknown') ||
			installedVersion.toLowerCase().includes('<невідомо>') ||
			availableVersion.toLowerCase().includes('<невідомо>')

		const existing = packageMap.get(id)

		if (existing) {
			if (existing.isUnknownVersion && !isUnknownVersion) {
			} else {
				continue
			}
		}

		packageMap.set(id, {
			id,
			name,
			installedVersion,
			availableVersion,
			source,
			isUnknownVersion,
			selected: false,
			status: 'pending',
		})
	}

	return Array.from(packageMap.values())
}
