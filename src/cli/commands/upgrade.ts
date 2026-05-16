import { fetchUpgrades } from '../../core/fetcher.js'
import { runUpgrades } from '../../core/upgrade-svc.js'
import { Logger } from '../../ui/logger.js'
import { selectPackages } from '../../ui/selector.js'

export async function upgradeAction(options: any) {
	const includeUnknown = options.includeUnknown || false

	Logger.info('Fetching available upgrades...')
	const packages = fetchUpgrades(includeUnknown)

	if (packages.length === 0) {
		Logger.ok('All packages are up to date. Nothing to upgrade.')
		process.exit(0)
	}

	let selectedIds: string[] = []

	if (options.id) {
		const targetIds = Array.isArray(options.id) ? options.id : [options.id]
		selectedIds = packages.filter(p => targetIds.includes(p.id)).map(p => p.id)

		if (selectedIds.length === 0) {
			Logger.warn('Provided ID(s) not found in the available upgrades list.')
			process.exit(1)
		}
	} else if (options.allSafe) {
		selectedIds = packages.filter(p => !p.isUnknownVersion).map(p => p.id)
		if (selectedIds.length === 0) {
			Logger.ok('No safe upgrades available.')
			process.exit(0)
		}
	} else {
		selectedIds = await selectPackages(packages)
		if (selectedIds.length === 0) {
			Logger.info('Upgrade cancelled. No packages selected.')
			process.exit(0)
		}
	}

	const dryRun = options.dryRun || false
	const failedCount = runUpgrades(packages, selectedIds, dryRun)

	if (failedCount > 0) {
		Logger.warn(`Finished with ${failedCount} error(s).`)
		process.exit(2)
	} else {
		Logger.ok('All selected packages upgraded successfully.')
		process.exit(0)
	}
}
