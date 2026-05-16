import { execSync } from 'node:child_process'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getUpgradeList, runUpgrade } from '../src/core/runner.js'

vi.mock('node:child_process', () => ({
	execSync: vi.fn(),
}))

const mockedExecSync = vi.mocked(execSync)

describe('Runner', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('getUpgradeList', () => {
		it('should return stdout on success', () => {
			mockedExecSync.mockReturnValue('Mocked winget output')
			const result = getUpgradeList(false)
			expect(mockedExecSync).toHaveBeenCalledWith(
				expect.stringContaining('winget upgrade'),
				expect.any(Object),
			)
			expect(result).toBe('Mocked winget output')
		})

		it('should return error.stdout if execSync throws but stdout is present', () => {
			const mockError = new Error('Command failed') as Error & {
				stdout: string
			}
			mockError.stdout = 'Output despite failure'
			mockedExecSync.mockImplementation(() => {
				throw mockError
			})
			const result = getUpgradeList(false)
			expect(result).toBe('Output despite failure')
		})

		it('should throw a custom error if winget is missing (ENOENT)', () => {
			const mockError = new Error('spawn ENOENT') as Error & { code: string }
			mockError.code = 'ENOENT'
			mockedExecSync.mockImplementation(() => {
				throw mockError
			})
			expect(() => getUpgradeList(false)).toThrow(/winget is not recognized/)
		})
	})

	describe('runUpgrade', () => {
		it('should return true on successful upgrade', () => {
			mockedExecSync.mockReturnValue('Success')
			const result = runUpgrade('Test.Package')
			expect(result).toBe(true)
			expect(mockedExecSync).toHaveBeenCalledWith(
				expect.stringContaining('--id "Test.Package" --exact'),
				expect.any(Object),
			)
		})

		it('should return false if upgrade fails', () => {
			mockedExecSync.mockImplementation(() => {
				throw new Error('Install failed')
			})
			const result = runUpgrade('Test.Package')
			expect(result).toBe(false)
		})
	})
})
