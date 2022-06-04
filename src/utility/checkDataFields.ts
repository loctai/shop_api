export const checkDataFields = (data: object, dataModel: object) => {
    const modelKeys = Object.keys(dataModel);

    for (const key in data) {
        if (!modelKeys.includes(key)) {
            return false;
        }
    }

    return true;
};
