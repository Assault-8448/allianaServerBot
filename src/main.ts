import { Message, Client } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

const prefix = 'ab.'

process.on('uncaughtExeption', (e) => {
    console.log(e)
})

const client = new Client({
    intents: 32767,
})

client.once('ready', () => {
    console.log('Ready!')
    if (client.user) {
        console.log(`Logged in as ${client.user.tag}`)
    }
})

client.on('messageCreate', async (message: Message) => {
    if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return
    const [command, ...args] = message.content.slice(prefix.length).split(' ')
    import(`./cogs/${command}`).then(module => {
        module.default(message, args)
    }).catch(err => {
        message.channel.send(`Command ${command} not found. \n${err}`)
        return null
    })
})

client.login(process.env.TOKEN)