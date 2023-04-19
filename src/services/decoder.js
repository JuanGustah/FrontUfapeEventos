const decoder = (token) => {
    let tokens = token.split('.');
    return JSON.parse(atob(tokens[1]));
}

export default decoder;