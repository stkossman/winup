import { Command } from 'commander'
import { checkAction } from './commands/check.js'
import { listAction } from './commands/list.js'
import { upgradeAction } from './commands/upgrade.js'

const program = new Command()

program
	.name('winup')
	.description('Minimal CLI tool for managing winget upgrades')
	.version('1.0.0')

program
	.command('check')
	.description(
		'Quickly check for available updates without printing the full list',
	)
	.action(checkAction)

program
	.command('list')
	.description('Display a table of available updates')
	.option(
		'--include-unknown',
		'Include packages with unknown versions in the list',
	)
	.action(listAction)

program
	.command('upgrade')
	.description('Upgrade packages interactively or automatically')
	.option(
		'--all-safe',
		'Automatically upgrade all safe packages without prompting',
	)
	.option('-i, --id <ids...>', 'Upgrade specific package(s) by ID')
	.option(
		'--include-unknown',
		'Include unknown versions in the interactive list',
	)
	.option('--dry-run', 'Simulate the upgrade process without making changes')
	.action(async options => {
		try {
			await upgradeAction(options)
		} catch (error: any) {
			if (error.name === 'ExitPromptError') {
				console.log('\n[ INFO ] Upgrade cancelled by user.')
				process.exit(0)
			}
			console.error(error)
			process.exit(1)
		}
	})

program.parse(process.argv)
