import { Message } from 'discord.js'
import fs from 'fs'

export default (message: Message, args: string[]) => {
    const bannedId: string[] = JSON.parse(fs.readFileSync('./.data/cantRename.json', 'utf-8') || 'null')
    const previousChangerId: string = JSON.parse(fs.readFileSync('./.data/rename.json', 'utf-8') || 'null')
    if (bannedId.find(id => id === message.author.id)) {
        return message.channel.send('名前を変える権限がありません。')
    }
    if (previousChangerId === message.author.id) {
        return message.channel.send('連続して名前を変更することは出来ません。')
    }
    if (args.length === 0) {
        return message.channel.send('変更したい名前を入れてください。')
    } else {
        const selectedName = args[0]
        if (selectedName.length >= 16) {
            return message.channel.send('名前は16文字以内にしてください。')
        } else {
            message.guild?.me?.setNickname(selectedName + "[ab.]")
            message.channel.send(`botの名前を\`${selectedName}\`に変更しました。`)
            const changerId = message.author.id
            fs.writeFileSync('./.data/rename.json', JSON.stringify(changerId), 'utf-8')
        }
    }
}