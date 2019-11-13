const requiredField = value => {
    if(value) {
        return undefined;
    } else {
        return "field is required"
    }
}