module.exports = (temp,repVal) =>{
    let outPut = temp.replace(/{%PRODUCTIMAGE%}/g,repVal.image);
    outPut = outPut.replace(/{%PRODUCTTITLE%}/g,repVal.title);
    outPut = outPut.replace(/{%PRODUCTPRICE%}/g,repVal.price);
    outPut = outPut.replace(/{%ID%}/g,repVal.id);
    outPut = outPut.replace(/{%DESCRIPTION%}/g,repVal.price);
    return outPut;
  };