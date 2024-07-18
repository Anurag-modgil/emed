import { useState } from "react";
import { Typography } from "@mui/material";
import {
  Grid,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";

import { Fragment } from "react";
import "./CreateProductForm.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../Redux/Customers/Product/Action";
import DeleteIcon from "@mui/icons-material/Delete";
import { categories, stockAvail } from "../../../utils/categories";
import notify from "../../../utils/notify";
const CreateProductForm = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    discountedPrice: "",
    price: "",
    discountPercent: "",
    quantity: "",
    description: "",
    stock: "in_stock",
  });
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      console.log("reader", reader);
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
    } else {
      setPreviewUrl(null);
    }
  };

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleSizeChange = (e, index) => {
  //   let { name, value } = e.target;
  //   name==="size_quantity"?name="quantity":name=e.target.name;

  //   const sizes = [...productData.size];
  //   sizes[index][name] = value;
  //   setProductData((prevState) => ({
  //     ...prevState,
  //     size: sizes,
  //   }));
  // };

  // const handleAddSize = () => {
  //   const sizes = [...productData.size];
  //   sizes.push({ name: "", quantity: "" });
  //   setProductData((prevState) => ({
  //     ...prevState,
  //     size: sizes,
  //   }));
  // };

  // const handleRemoveSize = (index) => {
  //   const sizes = [...productData.size];
  //   sizes.splice(index, 1);
  //   setProductData((prevState) => ({
  //     ...prevState,
  //     size: sizes,
  //   }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct({ data: productData, jwt }))
      .then((res) => {
        notify("success", "Product updated successfully!");
        setTimeout(() => {
          navigate("/admin/products");
        }, 1000);
      })
      .catch((err) => {
        notify("error", "Failed to update product.");
      });
    console.log(productData);
  };

  return (
    <div className="createProductContainer ">
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center "
      >
        Add New Product
      </Typography>
      <div className="formDiv">
        <form
          onSubmit={handleSubmit}
          className="createProductContainer min-h-screen"
        >
          <Grid container spacing={2} className="main-wrraper">
            <Box
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {previewUrl && (
                <Box>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      marginTop: "20px",
                    }}
                  />
                </Box>
              )}
            </Box>
            <Grid item xs={12} className="text_field-space" mt={"25px"}>
              <TextField
                fullWidth
                label="Image URL"
                name="imageUrl"
                value={productData.imageUrl}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Brand"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6} className="text_field-space">
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={productData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                value={productData.category}
                onChange={handleChange}
              >
                {categories &&
                  categories.map((item, id) => (
                    <MenuItem key={id} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                value={productData.quantity}
                onChange={handleChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6} className="text_field-space">
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={productData.price}
                onChange={handleChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Discounted Price"
                name="discountedPrice"
                value={productData.discountedPrice}
                onChange={handleChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6} className="text_field-space">
              <TextField
                fullWidth
                label="Discount Percentage"
                name="discountPercent"
                value={productData.discountPercent}
                onChange={handleChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} className="text_field-space">
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Description"
                multiline
                name="description"
                rows={3}
                onChange={handleChange}
                value={productData.description}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "30px",
              }}
            >
              <Button
                variant="contained"
                sx={{ p: 1.8 }}
                className="py-20"
                size="large"
                type="submit"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default CreateProductForm;
