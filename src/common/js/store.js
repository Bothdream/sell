export function saveTolocal (id,key,value) {
    let seller = localStorage._seller_;
    if (!seller) {
       seller = {};
       seller[id] = {};
    } else {
       seller = JSON.parse(seller);
       if (!seller[id]) {
          seller[id] = {};
       } 
    }
    seller[id][key] = value;
    localStorage._seller_ = JSON.stringify(seller);
};

export function readFromlocal (id,key,def) {
    let seller = localStorage._seller_;
    if (!seller) {
       return def;
    } else {
       seller = JSON.parse(seller);
       if (!seller[id]) {
          return def;
       } 
    }
    return seller[id][key] || def;
};

