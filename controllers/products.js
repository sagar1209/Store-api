const Product = require('../models/product');

const getAllProductsstatic = async(req,res)=>{
        const data = await  Product.find({price:{$lt:30}}).sort('price');
        res.status(200).json({data,nbhints:data.length})
}
const getAllProducts = async(req,res)=>{
    const {featured,company,name,numericfilters,sort,fields} = req.query;
    const queryobject = {}
    if(featured){
        queryobject.featured = featured==='true'?true:false;
    }
    if(company){
        queryobject.company = company;
    }
    if(name){
        queryobject.name = {$regex:name};
    }
    if(numericfilters){
        let operatormap = {
            '>' : '$gt',
            '>=' : '$gte',
            '<' : '$lt',
            '<=' : '$lte',
            '=' : '$eq',

        }
        const regEX = /\b(<|>|<=|>=|=)\b/g
        let filters = numericfilters.replace(regEX,(match)=>`-${operatormap[match]}-`)
        const options  = ['price','rating'];
        filters = filters.split(',').forEach((item)=>{
             const [field,operator,value] = item.split('-');
             if(options.includes(field)){
                queryobject[field] =  { [operator] : Number(value)}
             }
        });

    }

    let result = Product.find(queryobject);

    // sort
    if (sort) {
      const sortList = sort.split(',').join(' ');
      result = result.sort(sortList);
    } else {
      result = result.sort('createdAt');
    }

    //fields
    if(fields){
        const fieldsList = fields.split(',').join(' ');
         result = result.select(fieldsList);
    }

   //page & limit
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip  =  (page-1)*limit;
    result = result.skip(skip).limit(limit);


    const products = await result;
    res.status(200).json({nbhits:products.length,products})
}

module.exports = {getAllProducts,getAllProductsstatic}