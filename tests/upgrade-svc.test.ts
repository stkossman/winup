import { beforeEach, describe, expect, it, vi } from 'vitest'
import { runUpgrade } from '../src/core/runner.js'
import { runUpgrades } from '../src/core/upgrade-svc.js'
import type { PackageEntry } from '../src/models/package.js'

vi.mock('../src/core/runner.js', () => ({
	runUpgrade: vi.fn(),
}))

vi.mock('../src/ui/logger.js', () => ({
	Logger: {
		info: vi.fn(),
		ok: vi.fn(),
		warn: vi.fn(),
		error: vi.fn(),
		emptyLine: vi.fn(),
	},
}))

const mockedRunUpgrade = vi.mocked(runUpgrade)

describe('UpgradeService', () => {
	let mockPackages: PackageEntry[]

	beforeEach(() => {
		vi.clearAllMocks()
		mockPackages = [
			{
				id: 'App.1',
				name: 'App1',
				installedVersion: '1.0',
				availableVersion: '2.0',
				source: 'winget',
				isUnknownVersion: false,
				selected: false,
				status: 'pending',
			},
			{
				id: 'App.2',
				name: 'App2',
				installedVersion: '1.0',
				availableVersion: '2.0',
				source: 'winget',
				isUnknownVersion: false,
				selected: false,
				status: 'pending',
			},
		]
	})

	it('should not call Runner when isDryRun is true, and return 0 fails', () => {
		const result = runUpgrades(mockPackages, ['App.1', 'App.2'], true)
		expect(mockedRunUpgrade).not.toHaveBeenCalled()
		expect(result).toBe(0)
		expect(mockPackages[0].status).toBe('success')
		expect(mockPackages[1].status).toBe('success')
	})

	it('should call Runner for each selected package and return 0 fails on success', () => {
		mockedRunUpgrade.mockReturnValue(true)
		const result = runUpgrades(mockPackages, ['App.1'], false)
		expect(mockedRunUpgrade).toHaveBeenCalledTimes(1)
		expect(mockedRunUpgrade).toHaveBeenCalledWith('App.1')
		expect(result).toBe(0)
		expect(mockPackages[0].status).toBe('success')
		expect(mockPackages[1].status).toBe('pending')
	})

	it('should accumulate failed upgrades and update status to error', () => {
		mockedRunUpgrade.mockImplementation((id: string) => id !== 'App.1')
		const result = runUpgrades(mockPackages, ['App.1', 'App.2'], false)
		expect(mockedRunUpgrade).toHaveBeenCalledTimes(2)
		expect(result).toBe(1)
		expect(mockPackages[0].status).toBe('error')
		expect(mockPackages[1].status).toBe('success')
	})
})
