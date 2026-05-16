import { execSync } from 'node:child_process'

interface ExecError {
	stdout?: string
	message: string
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
