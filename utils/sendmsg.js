const sendmsg = async (bot, group, user, msg) => {
    if (group === 1) {
        const room = await bot.Room.find({ topic: user })
        if (room) {
            await room.say(msg)
        } else {
            console.log('not found')
        }
        // await contact.say(msg)

    }
    else {
        const contact = await bot.Contact.find({ name: user }) // change 'lijiarui' to any of the room member
        if (contact) {
            await contact.say(msg)
        } else {
            console.log('not found')
        }
    }
}
export default sendmsg