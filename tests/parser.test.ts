import { describe, expect, it } from 'vitest'
import { parseWingetOutput } from '../src/core/parser.js'

describe('Parser', () => {
	it('should parse standard winget table output', () => {
		const raw = `
Name            Id                 Version  Available Source
------------------------------------------------------------
Google Chrome   Google.Chrome      114.0    115.0     winget
Telegram        Telegram.Telegram  unknown  unknown   winget
    `
		const result = parseWingetOutput(raw)

		expect(result).toHaveLength(2)
		expect(result[0].name).toBe('Google Chrome')
		expect(result[0].id).toBe('Google.Chrome')
		expect(result[0].available).toBe('115.0')

		expect(result[1].name).toBe('Telegram')
		expect(result[1].version).toBe('unknown')
	})

	it('should return empty array if no table separator is found', () => {
		const raw = `No installed package found matching input criteria.`
		const result = parseWingetOutput(raw)
		expect(result).toEqual([])
	})
})
