import { fetchUpgrades } from '../../core/fetcher.js'
import { Logger } from '../../ui/logger.js'

export function checkAction() {
	Logger.info('Checking for available updates...')

	const packages = fetchUpgrades(true)

	if (packages.length === 0) {
		Logger.ok('All packages are up to date. No upgrades found.')
		process.exit(0)
	}

	const safeCount = packages.filter(p => !p.isUnknownVersion).length
	const unknownCount = packages.filter(p => p.isUnknownVersion).length

	Logger.ok(
		`Found ${packages.length} upgrades (Safe: ${safeCount}, Unknown: ${unknownCount}).`,
	)
	Logger.info(
		"Use 'winup list' or 'winup list --include-unknown' to view them.",
	)
}
