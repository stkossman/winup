import { describe, expect, it } from 'vitest'
import { normalizePackages } from '../src/core/normalizer.js'

describe('Normalizer', () => {
	it('should convert raw objects to PackageEntry and flag unknowns', () => {
		const raw = [
			{
				name: 'App1',
				id: 'App.1',
				version: '1.0',
				available: '2.0',
				source: 'winget',
			},
			{
				name: 'App2',
				id: 'App.2',
				version: 'unknown',
				available: 'unknown',
				source: 'winget',
			},
		]

		const result = normalizePackages(raw)

		expect(result).toHaveLength(2)
		expect(result[0].isUnknownVersion).toBe(false)
		expect(result[1].isUnknownVersion).toBe(true)
	})

	it('should deduplicate by ID, preferring known versions', () => {
		const raw = [
			{
				name: 'App1',
				id: 'App.Duplicate',
				version: 'unknown',
				available: 'unknown',
			},
			{ name: 'App1', id: 'App.Duplicate', version: '1.0', available: '2.0' }, // Better
		]

		const result = normalizePackages(raw)

		expect(result).toHaveLength(1)
		expect(result[0].availableVersion).toBe('2.0')
		expect(result[0].isUnknownVersion).toBe(false)
	})

	it('should ignore entries without available version column', () => {
		const raw = [
			{ name: 'App1', id: 'App.1', version: '1.0' }, // Missing 'available'
		]
		const result = normalizePackages(raw)
		expect(result).toHaveLength(0)
	})
})
