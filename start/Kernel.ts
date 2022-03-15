import CoreCommands from '@discord-factory/core-commands'
import StorageNext from '@discord-factory/storage-next'

export default class Kernel {
  public registerAddons () {
    return [CoreCommands, StorageNext]
  }
}