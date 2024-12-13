export const logStoreUpdate = (
  actionName: string,
  previousState: any,
  nextState: any
) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`[Store Update: ${actionName}]`)
    console.log('Previous:', previousState)
    console.log('Next:', nextState)
    console.log('Diff:', Object.keys(nextState).reduce((diff: Record<string, any>, key) => {
      if (previousState[key] !== nextState[key]) {
        diff[key] = {
          from: previousState[key],
          to: nextState[key]
        }
      }
      return diff
    }, {}))
    console.groupEnd()
  }
} 