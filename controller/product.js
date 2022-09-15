const products = require('../model/schema')

const getProducts = async (req,res)=>{
    //const prod = await products.find({featured:true})
     const {featured,company,name,sort,fields,numericFilters} = req.query
    const queryobj = {}

    if (featured){
        queryobj.featured = featured ==='true' ? true: false
    }
    if (company){
        queryobj.company = company
    }
    if (name){
        queryobj.name = {$regex:name,$options:'i'}
    }
    

    //console.log(queryobj) 
    let result =  products.find(queryobj)
    if (sort){
        const sortlist = sort.split(',').join(' ')
        console.log(sortlist)
        result = result.sort(sortlist)
        //console.log(sort)
        //prod = prod.sort()
    }
    else{
        result = result.sort('createdAt')
    }

    if (fields){
        const fieldlist = fields.split(',').join(' ')
        console.log(fieldlist)
        result = result.select(fieldlist)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1)*limit
    
    result=  result.skip(skip).limit(limit)

    if (numericFilters){
        const operatorMap={
           '>':'$gt',
           '>=':'$gte',
           '<':'$lt',
           '<=':'$lte',
           '=':'$eq' 
        }
        let filters = numericFilters.replace(/\b(>|<|=|<=|>=)\b/g,m=>`-${operatorMap[m]}-`)
        console.log(filters)
        const options = ['price','rating']
        filters = filters.split(',').forEach(element => {
            const [field,operator,value] = element.split('-')
            if (options.includes(field)){
                queryobj[field] = {[operator]:Number(value)}
            }
        });
    }
    console.log(queryobj)
    result = result.find(queryobj)
    const prod = await result
    //const prod = await products.find({}).sort('-name price')
    //console.log(prod)
    res.status(200).json({prod,amount:prod.length})

}

const createProduct = async (req,res)=>{
    try{
    const newprod = await products.create(req.body)
    res.status(200).json({newprod})
    }
    catch(err){
        res.status(500).json({msg:'name or price missing'})
    }

}

const updateProduct =async (req,res)=>{
    try{
        const newprod = await products.findOneAndUpdate({_id:req.params.id},req.body,{
            new:true,runValidators:true})
        
        if (!newprod){
            res.status(404).json({msg:'no product with this id'})
        }

        res.status(200).json({newprod})

    }
    catch(err){
        res.status(500).json({msg:err})
    }
}

const deleteProduct = async (req,res)=>{
    try{
        const newprod = await products.findByIdAndDelete({_id:req.params.id})
        if (!newprod){
            return res.status(404).json({msg:'no product with this id'})
        }
        res.status(200).json('successfully deleted')
    }
    catch(err){
        res.status(500).json({msg:err})
    }
}
module.exports = {getProducts,
                    createProduct,
                    updateProduct,
                    deleteProduct}
