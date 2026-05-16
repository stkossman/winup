export type UpgradeStatus =
	| 'pending'
	| 'upgrading'
	| 'success'
	| 'error'
	| 'skipped'

export interface PackageEntry {
	id: string
	name: string
	installedVersion: string
	availableVersion: string
	source: string
	isUnknownVersion: boolean
	selected: boolean
	status: UpgradeStatus
	errorMessage?: string
}
