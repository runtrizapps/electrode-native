import { getActiveCauldron } from 'ern-cauldron-api'
import { NativeApplicationDescriptor, log, kax } from 'ern-core'
import _ from 'lodash'
import {
  epilog,
  logErrorAndExitIfNotSatisfied,
  tryCatchWrap,
  askUserConfirmation,
} from '../../../lib'
import { Argv } from 'yargs'

export const command = 'nativeapp <descriptor>'
export const desc = 'Add a native application to the cauldron'

export const builder = (argv: Argv) => {
  return argv
    .option('copyFromVersion', {
      alias: 'c',
      describe: 'Copy Cauldron data from a previous native application version',
      type: 'string',
    })
    .coerce('descriptor', d =>
      NativeApplicationDescriptor.fromString(d, { throwIfNotComplete: true })
    )
    .option('platformVersion', {
      alias: 'v',
      describe: 'Use specified platform version',
    })
    .epilog(epilog(exports))
}

export const commandHandler = async ({
  copyFromVersion,
  descriptor,
}: {
  copyFromVersion?: string
  descriptor: NativeApplicationDescriptor
}) => {
  let cauldron

  await logErrorAndExitIfNotSatisfied({
    napDescritorDoesNotExistsInCauldron: {
      descriptor,
      extraErrorMessage:
        'This version of the native application already exist in Cauldron.',
    },
  })

  cauldron = await getActiveCauldron()
  await cauldron.beginTransaction()

  if (copyFromVersion === 'none') {
    copyFromVersion = undefined
  } else if (
    !copyFromVersion &&
    (await cauldron.isDescriptorInCauldron(
      new NativeApplicationDescriptor(descriptor.name, descriptor.platform)
    ))
  ) {
    const mostRecentVersion = await cauldron.getMostRecentNativeApplicationVersion(
      descriptor
    ).name
    if (
      await askUserConfirmation(
        `Do you want to copy data from version (${mostRecentVersion}) ?`
      )
    ) {
      copyFromVersion = mostRecentVersion
    }
  }

  await kax
    .task(`Adding ${descriptor}`)
    .run(cauldron.addNativeApplicationVersion(descriptor, { copyFromVersion }))

  await kax
    .task('Updating Cauldron')
    .run(cauldron.commitTransaction(`Add ${descriptor} native application`))
  log.info(`${descriptor} successfully added to the the Cauldron`)
}

export const handler = tryCatchWrap(commandHandler)
