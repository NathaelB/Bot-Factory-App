import { Ignitor } from '@discord-factory/core-next'
import Config from "../src/utils/Config";



(async () => {
    await Config.create()

    const ignitor = new Ignitor()
    await ignitor.createFactory()
})()