
import Product from "../models/productModel.js";
class APIFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: { 
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}
        // console.log(keyword)
        this.query = this.query.find({...keyword});
        return this;

    }

    // filter() {
    //     const queryCopy = {...this.queryStr};

    //     const RemoveFields = ['keyword', 'limit', 'page',];
    //     RemoveFields.forEach(el => delete queryCopy[el]);

    //     let queryStr = JSON.stringify(queryCopy)
    //     queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
    //     // console.log(query)
    //     this.query = this.query.find(JSON.parse(queryStr))
    //     return this;
    // }

    sort(){

        const queryCopy = {...this.queryStr};
        const RemoveFields = ['keyword', 'limit', 'page'];
        RemoveFields.forEach(el => delete queryCopy[el]);
        const temp = Object.keys(queryCopy);
        if(temp.includes("price")){
        }
        else {
            return this
        }

        const priceQuery = Object.entries(queryCopy)
        console.log(priceQuery[0][1])
        if(priceQuery[0][1] == 1){
            this.query = this.query.find().sort('price');
        }
        else if(priceQuery[0][1] ==-1){
            this.query = this.query.find().sort('-price');
        }
        return this;
    }

}

export default APIFeatures;

