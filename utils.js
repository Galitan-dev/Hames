/**
 * @param {number} length 
 * @param {string[]} [usedIds]
 */
function generateId(length, usedIds = []) { const chars = "ABCDEF";

    if (length < 2) return 

    var id = "";

    // make id random
    for (let i = 0; i < length - 1; i++) 
        id += chars[Math.floor(Math.random() * chars.length)]; 

    // escape difficult ids
    if (!id.split('').some((c, i) => id.lastIndexOf(c) > i)) //if difficult
        id += id[Math.floor(Math.random() * id.length)]; //random already used char
    else //if easy
        id += chars[Math.floor(Math.random() * chars.length)]; //random new char (it can be already used)

    // escape impostors
    if (usedIds.includes(id))
        return generateId(usedIds);

    return id;

}

module.exports = {
    generateId
}