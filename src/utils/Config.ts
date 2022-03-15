import * as fs from "fs";
import path from "path";
import { load } from 'js-yaml'

export default class Config {
    private static $instance: Config
    private env: Map<string, any> = new Map()

    constructor() {
    }

    private static getInstance () {
        if (!this.$instance) {
            this.$instance = new Config()
            this.$instance.init()
        }
        return this.$instance
    }

    private async init () {
        const envFile = await fs.promises.readFile(path.join(process.cwd(), "config.yaml"), "utf-8")
        const env = await load(envFile)
        Object.entries(env).forEach(([key, value]) => {
            this.env.set(key, value)
        })
    }

    public static get<T = any> (val: string): T  {
        const instance = this.getInstance()
        return instance.env.get(val)
    }

    public static async create () {
        return this.getInstance()
    }
}