import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  findProducts,
} from "../../../Redux/Customers/Product/Action";
import BackdropComponent from "../../../customer/components/BackDrop/Backdrop";
import { categories } from "../../../utils/categories";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import notify from "../../../utils/notify";
import Modal from "../../../utils/Modal";
const ProductsTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [filterValue, setFilterValue] = useState({
    availability: "",
    category: "",
    sort: "",
    search: "",
  });

  // query
  const searchParams = new URLSearchParams(location.search);
  const availability = searchParams.get("availability");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search");

  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    // setFilterValue({ availability, category, sort });
    const data = {
      category: category || "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: sort || "price_low",
      pageNumber: page || 1,
      pageSize: 20,
      stock: availability,
      search: search || "",
    };
    dispatch(findProducts(data));
  }, [
    availability,
    category,
    sort,
    page,
    search,
    customersProduct.deleteProduct,
  ]);

  const handleFilterChange = (e, sectionId) => {
    if (sectionId === "category") {
      setFilterValue((values) => ({
        ...values,
        [sectionId]: e.target.value,
        search: "",
      }));
      searchParams.delete("search");
      searchParams.set(sectionId, e.target.value);
      const query = searchParams.toString();
      navigate({ search: `?${query}` });
    } else {
      searchParams.set(sectionId, e.target.value);
      const query = searchParams.toString();
      navigate({ search: `?${query}` });
      setFilterValue((values) => ({ ...values, [sectionId]: e.target.value }));
    }
  };

  const handleDeleteProduct = (productId) => {
    console.log("delete product ", productId);
    dispatch(deleteProduct(productId));
  };
  const handleEditProduct = (productId) => {
    navigate(`/admin/product/update/${productId}`);
  };
  const handleSearch = () => {
    if (!filterValue.search.trim()) {
      notify("error", "Search field cannot be empty!");
      return;
    }
    searchParams.set("search", filterValue.search);
    navigate({ search: `?${searchParams.toString()}` });
  };
  const handleClickOpen = (id) => {
    setOpenDialog(true);
    setDeleteProductId(id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteProductId(null);
  };

  const handleConfirmDelete = () => {
    if (deleteProductId) {
      dispatch(deleteProduct(deleteProductId))
        .then(() => {
          notify("success", "Product deleted successfully!");
          handleCloseDialog();
        })
        .catch((err) => {
          console.error("error in deleting product", err);
          notify("error", "Failed to delete product.");
          handleCloseDialog();
        });
    }
  };
  return (
    <Box width={"100%"}>
      <Card className="mt-2">
        <CardHeader
          title={"All Products "}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItem: "center",
          }}
        >
          <Box p={2} width="23%">
            {/* Category Dropdown */}
            <FormControl fullWidth variant="outlined">
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={filterValue.category}
                onChange={(e) => handleFilterChange(e, "category")}
                label="Category"
              >
                {categories &&
                  categories.map((item, id) => (
                    <MenuItem key={id} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box style={{ padding: "16px" }}>
            <TextField
              label="Search"
              variant="outlined"
              value={filterValue.search}
              onChange={(e) =>
                setFilterValue({ ...filterValue, search: e.target.value })
              }
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Quantity</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customersProduct.products?.content?.map((item, index) => (
                <TableRow
                  hover
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {" "}
                    <Avatar alt={item.title} src={item.imageUrl} />{" "}
                  </TableCell>

                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="caption">{item.brand}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.discountedPrice}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.quantity}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      color:
                        item.stock === "in_stock"
                          ? "green"
                          : item.stock === "out_of_stock"
                          ? "red"
                          : "blue",
                    }}
                  >
                    {item.stock == "in_stock"
                      ? "In Stock"
                      : item.stock == "out_of_stock"
                      ? "Out Of Stock"
                      : "N/A"}
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditProduct(item._id)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleClickOpen(item._id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 border">
        {/* <Pagination
          className="py-5 border w-auto"
          size="large"
          count={10}
          color="primary"
          onChange={handlePaginationChange}
        /> */}

        <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
          <Pagination
            count={customersProduct.products?.totalPages || 1} // Default to 1 if undefined
            page={parseInt(page, 10)} // Ensure `page` is an integer
            color="primary"
            onChange={handlePaginationChange}
          />
        </div>
      </Card>
      <BackdropComponent open={customersProduct.loading} />
      <Modal
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </Box>
  );
};

export default ProductsTable;
