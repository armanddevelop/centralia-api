export const buildFields = (
    fields: ReadonlyArray<string>,
    fieldName: string = ""
) => {
    if (fieldName === "") {
        return fields;
    }
    const fieldsQuery = fields.filter((field) => field !== fieldName);
    return fieldsQuery;
};
