export const checkActionType = (action, sliceName, type) =>
    action.type.startsWith(sliceName) && action.type.endsWith('/' + type);
