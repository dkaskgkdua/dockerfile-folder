const changeComp = (data) => {
    return { // action
        type: 'CHANGE_COMP_A',
        data,
    }
}

module.exports = {
    changeComp
};