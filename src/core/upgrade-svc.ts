import { PackageEntry } from '../models/package.js'
import { Logger } from '../ui/logger.js'
import { runUpgrade } from './runner.js'

export function runUpgrades(
	packages: PackageEntry[],
	selectedIds: string[],
	isDryRun: boolean,
): number {
	const toUpgrade = packages.filter(p => selectedIds.includes(p.id))
	let failedCount = 0

	Logger.emptyLine()
	Logger.info(`Starting upgrade for ${toUpgrade.length} package(s)...`)

	for (const pkg of toUpgrade) {
		Logger.info(`Upgrading ${pkg.name} (${pkg.id})...`)

		if (isDryRun) {
			pkg.status = 'success'
			Logger.ok(`${pkg.id} successfully upgraded (DRY RUN).`)
			continue
		}

		pkg.status = 'upgrading'
		const success = runUpgrade(pkg.id)

		if (success) {
			pkg.status = 'success'
			Logger.ok(`${pkg.id} successfully upgraded.`)
		} else {
			pkg.status = 'error'
			failedCount++
			Logger.error(
				`${pkg.id} failed to upgrade. It might require admin privileges or is currently running.`,
			)
		}
	}

	Logger.emptyLine()
	return failedCount
}
