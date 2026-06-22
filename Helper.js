export function isValidTitle(newTitle) {
    return typeof newTitle === 'string' && newTitle.trim().length > 0;
}