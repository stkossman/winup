// src/test-runner.ts
import { getUpgradeList } from './core/runner.js'

console.log(
	'[ INFO ] Fetching upgrade list from winget... (this may take a few seconds)',
)
try {
	const output = getUpgradeList(false)
	console.log('\n--- RAW WINGET OUTPUT ---')
	console.log(output)
	console.log('-------------------------\n')
	console.log('[ OK ] Runner executed successfully.')
} catch (error) {
	const message = error instanceof Error ? error.message : String(error)
	console.error('[ ERR ] Runner failed:', message)
}
