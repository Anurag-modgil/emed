// Create a new product
// import findBySalt from "../models/product.model"
const Product = require("../models/product.model");


// Create a new product
async function createProduct(reqData) {
  const product = new Product({
    title: reqData.title,
    description: reqData.description,
    category: reqData.category,
    discountedPrice: reqData.discountedPrice,
    discountPersent: reqData.discountPercent,
    imageUrl: reqData.imageUrl,
    brand: reqData.brand,
    price: reqData.price,
    quantity: reqData.quantity,
    salt: reqData.salt,
    stock: reqData.stock
  });

  const savedProduct = await product.save();

  return savedProduct;
}

// Delete a product by ID
async function deleteProduct(productId) {
  const product = await findProductById(productId);

  if (!product) {
    throw new Error("product not found with id - : ", productId);
  }

  await Product.findByIdAndDelete(productId);

  return "Product deleted Successfully";
}

// Update a product by ID
async function updateProduct(productId, reqData) {
  const updatedProduct = await Product.findByIdAndUpdate(productId, reqData);
  return updatedProduct;
}

// Find a product by ID
const findProductById = async (id) => {
  try {
    const product = await Product.findById(id).exec();

    if (!product) {
      throw new Error("Product not found with id " + id);
    }

    return product;
  } catch (error) {
    throw new Error("Error finding product by id: " + error.message);
  }
};
const findProductsBySalt = async (salt) => {
  try {
    const products = await Product.findBySalt({ salt }).exec();


    if (!products || products.length === 0) {
      throw new Error("No products found with salt " + salt);

    }

    return products;
  } catch (error) {
    throw new Error("Error finding products by salt: " + error.message);
  }
};
// Get all products with filtering and pagination
async function getAllProducts(reqQuery) {
  try {
    let {
      minPrice,
      maxPrice,
      minDiscount,
      sort,
      stock,
      page,
      pageSize,
      category,
      search
    } = reqQuery;

    pageSize = parseInt(pageSize) || 20;
    let pageNumber = parseInt(page) || 1;

    let query = Product.find();
    if (minPrice && maxPrice) {
      query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);

    }

    if (minDiscount) {
      query = query.where("discountPersent").gt(minDiscount);
    }
    if (category) {
      query = query.where("category").equals(category);
    }
    if (search) {
      const regex = new RegExp(search, 'i');
      query = query.or([
        { brand: { $regex: regex } },
        { description: { $regex: regex } },
        { title: { $regex: regex } }
      ]);
    }

    if (stock) {
      if (stock === "in_stock") {
        query = query.where("quantity").gt(0);
      } else if (stock === "out_of_stock") {
        query = query.where("quantity").lte(0);
      }
    }

    if (sort) {
      const sortDirection = sort === "price_high" ? -1 : 1;
      query = query.sort({ discountedPrice: sortDirection });
    }

    const totalProducts = await Product.countDocuments(query.getFilter());
    // Apply pagination
    const skip = (pageNumber - 1) * pageSize;
    query = query.skip(skip).limit(pageSize);
    console.log('query???', query)
    const products = await query.exec();
    const totalPages = Math.ceil(totalProducts / pageSize);

    return { content: products, currentPage: pageNumber, totalPages: totalPages };
  } catch (error) {
    console.log('error', error)
  }

}


async function createMultipleProduct(products) {
  for (let product of products) {
    await createProduct(product);
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
  findProductsBySalt,
  createMultipleProduct,
};
