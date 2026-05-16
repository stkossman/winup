import { PackageEntry } from '../models/package.js'
import { Logger } from '../ui/logger.js'
import { normalizePackages } from './normalizer.js'
import { parseWingetOutput } from './parser.js'
import { getUpgradeList } from './runner.js'

export function fetchUpgrades(includeUnknown: boolean): PackageEntry[] {
	try {
		const rawText = getUpgradeList(includeUnknown)
		const rawObjects = parseWingetOutput(rawText)
		return normalizePackages(rawObjects)
	} catch (error: any) {
		Logger.error(`Failed to fetch updates: ${error.message}`)
		process.exit(1)
	}
}
