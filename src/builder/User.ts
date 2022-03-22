import User from "App/database/models/User";
import {ObjectResolvable} from "@discord-factory/storage-next/build/types";

export default class UserBuilder {

    private static $instance: UserBuilder
    private id: string

    public static async get (id: string): Promise<User> {
        return await User.findBy('user_id', id)
    }

    public static async verif (id: string): Promise<boolean> {
        const user = await this.get(id)
        return !!user;
    }

    public static async init (id: string): Promise<User | undefined> {
        if (!await this.verif(id)) {
            return await User.create({
                user_id: id,
                exp: 0,
                level: 1
            })
        }
    }

    public static async modif (id:string,  data: ObjectResolvable): Promise<{$persisted: boolean}> {
        const user = await this.get(id)
        return await user.update(data)
    }

    public static async delete (id: string): Promise<{$deleted: boolean}> {
        const user = await this.get(id)
        return await user.delete()
    }
}