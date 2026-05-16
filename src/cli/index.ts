import { Command } from 'commander'

const program = new Command()

program
	.name('winup')
	.description('Minimal CLI tool for managing winget upgrades')
	.version('1.0.0')

program
	.command('check')
	.description('Check for available updates')
	.action(() => {
		console.log('[ INFO ] Checking for updates...')
	})

program.parse()
