import pc from 'picocolors'

export const Logger = {
	info: (msg: string) => console.log(`${pc.cyan('[ INFO ]')} ${msg}`),
	ok: (msg: string) => console.log(`${pc.green('[ OK ]')} ${msg}`),
	warn: (msg: string) => console.log(`${pc.yellow('[ WARN ]')} ${msg}`),
	error: (msg: string) => console.error(`${pc.red('[ ERR ]')} ${msg}`),

	tableHeader: (msg: string) => console.log(pc.bold(msg)),
	tableRow: (msg: string) => console.log(msg),
	emptyLine: () => console.log(),
}
