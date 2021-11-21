import { Message } from 'discord.js'
import fs from 'fs'

export default (message: Message, args: string[]) => {
    if (message.member?.permissions.has('ADMINISTRATOR')) {
        const requestedGuildMember = message.guild?.members.fetch(args[0])
        requestedGuildMember?.then(member => {
            const cantRenameMembersId: string[] = JSON.parse(fs.readFileSync('./.data/cantRename.json', 'utf-8'))
            cantRenameMembersId.splice(cantRenameMembersId.indexOf(member.id))
            fs.writeFileSync('./.data/cantRename.json', JSON.stringify(cantRenameMembersId), 'utf-8')
        })
    }
}