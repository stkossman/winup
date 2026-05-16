import { execSync } from 'node:child_process'

interface ExecError {
	stdout?: string
	message: string
	code?: string
}

export function getUpgradeList(includeUnknown: boolean): string {
	let command =
		'winget upgrade --accept-source-agreements --accept-package-agreements'
	if (includeUnknown) {
		command += ' --include-unknown'
	}
	try {
		return execSync(command, { encoding: 'utf-8', stdio: 'pipe' })
	} catch (error) {
		const err = error as ExecError
		if (
			err.code === 'ENOENT' ||
			(err.message && err.message.includes('ENOENT'))
		) {
			throw new Error(
				'winget is not recognized. Ensure you are on Windows 10/11 and App Installer is installed.',
			)
		}
		if (err.stdout) {
			return err.stdout
		}
		throw new Error(`Failed to execute winget: ${err.message}`)
	}
}

export function runUpgrade(id: string): boolean {
	const command = `winget upgrade --id "${id}" --exact --accept-source-agreements --accept-package-agreements`
	try {
		execSync(command, { encoding: 'utf-8', stdio: 'pipe' })
		return true
	} catch {
		return false
	}
}
