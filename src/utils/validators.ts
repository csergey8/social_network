export type FiledValidatorType = (value: string) => string | undefined

export const required: FiledValidatorType = (value: string): string | undefined => {
    if(value) {
        return undefined;
    } else {
        return "field is required"
    }
}

export const maxLengthCreator = (maxLength: number): FiledValidatorType => (value: string) =>  {
    if(value && value.length > maxLength){
        return `Max length is ${maxLength} symbols`
    } else {
        return undefined
    }
}