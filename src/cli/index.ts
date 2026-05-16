import { Command } from 'commander'
import { checkAction } from './commands/check.js'
import { listAction } from './commands/list.js'

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

program.parse(process.argv)
