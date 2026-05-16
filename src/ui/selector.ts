import checkbox from '@inquirer/checkbox'
import pc from 'picocolors'
import { PackageEntry } from '../models/package.js'

export async function selectPackages(
	packages: PackageEntry[],
): Promise<string[]> {
	const choices = packages.map(pkg => {
		const isUnknown = pkg.isUnknownVersion
		const nameColor = isUnknown ? pc.yellow : pc.cyan
		const versionText = `[${pkg.installedVersion} -> ${pkg.availableVersion}]`

		return {
			name: `${nameColor(pkg.name)} (${pkg.id}) ${pc.dim(versionText)}${isUnknown ? pc.yellow(' (UNKNOWN)') : ''}`,
			value: pkg.id,
			checked: !isUnknown,
		}
	})

	return checkbox({
		message: 'Select packages to upgrade (Space to select, Enter to confirm):',
		choices,
		loop: false,
	})
}
