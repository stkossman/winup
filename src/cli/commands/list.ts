import { fetchUpgrades } from '../../core/fetcher.js'
import { Logger } from '../../ui/logger.js'

export function listAction(options: { includeUnknown?: boolean }) {
	Logger.info('Fetching available upgrades...')

	const packages = fetchUpgrades(!!options.includeUnknown)

	const visiblePackages = options.includeUnknown
		? packages
		: packages.filter(p => !p.isUnknownVersion)

	if (visiblePackages.length === 0) {
		Logger.ok('All packages are up to date. No upgrades found.')
		process.exit(0)
	}

	Logger.emptyLine()
	Logger.info(
		options.includeUnknown
			? 'Available upgrades (Safe & Unknown):'
			: 'Available safe upgrades:',
	)

	const idPad = Math.max(...visiblePackages.map(p => p.id.length), 15) + 2
	const namePad = Math.max(...visiblePackages.map(p => p.name.length), 20) + 2
	const curPad =
		Math.max(...visiblePackages.map(p => p.installedVersion.length), 10) + 2

	Logger.tableHeader(
		'ID'.padEnd(idPad) +
			'Name'.padEnd(namePad) +
			'Current'.padEnd(curPad) +
			'Available',
	)

	Logger.tableRow('-'.repeat(idPad + namePad + curPad + 15))

	for (const pkg of visiblePackages) {
		Logger.tableRow(
			pkg.id.padEnd(idPad) +
				pkg.name.padEnd(namePad) +
				pkg.installedVersion.padEnd(curPad) +
				pkg.availableVersion,
		)
	}
	Logger.emptyLine()
}
