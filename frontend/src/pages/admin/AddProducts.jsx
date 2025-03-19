import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "@/store/features/categories/categoriesSlice.js";
import { addProduct } from "@/store/features/products/productSlice.js";
import { toast } from "react-toastify";

function AddProducts() {
  const [inputValues, setInputValues] = useState({});
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.categories.error);
  const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValues((values) => ({ ...values, [name]: value }));
  };

  const handleCategoryChange =(value)=>{
    setInputValues((values) => ({ ...values, category: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
     dispatch(addProduct(inputValues))
            .unwrap()
            .then((response)=>{
              if(response?.success == true){
                toast.success(response?.message, {autoClose:1000})
                setTimeout(() => {
                  setInputValues({})
                  navigate("/admin/products")
                }, 1000);
              }else{
                toast.error(response?.message, {autoClose:1000})
              }    
            })
            .catch((error)=>{
              toast.error(error, {autoClose:1000})     
            })
    
  };

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  if (status == "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading Categories... </p>
      </div>
    );
  }
  if (error == "error") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>An Unexpected Error Occurs While Loading Categories</p>
      </div>
    );
  }

  return (
    <>
      <Card className="w-full  ">
        <CardHeader>
          <CardTitle className="text-2xl">Product Details</CardTitle>
          <CardDescription>
            Enter your information to add a product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder=" Enter Product Title"
                  required
                  name="title"
                  value={inputValues.title || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder=" Enter Product price"
                    required
                    name="price"
                    value={inputValues.price || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2 ">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={handleCategoryChange}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories &&
                        categories.categories &&
                        categories.categories.map((category) => {
                          return (
                            <SelectItem
                              className="capitalize"
                              key={category._id}
                              value={category._id}
                            >
                              {category.name}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="picture">Picture</Label>
                  <Input
                    id="picture"
                    type="file"
                    placeholder=" Enter Product picture"
                    required
                    name="picture"

                    onChange={(e)=>{
                      handleChange({
                        target:{
                            name:"picture",
                            value: e.target.files[0],
                        }
                      })

                    }}
                  />
                </div>
              <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                  
                  id="description"
                  className="min-h-32"
                  type="number"
                  placeholder=" Enter Product description"
                  name="description"
                  value={inputValues.description || ""}
                  onChange={handleChange}
                  
                  
                  />

                </div>

              <Button
                type="submit"
                className="max-w-36"
                disabled={productStatus == "loading" ? true : false}
              >
                {productStatus == "loading" ? "Adding Product..." : "Add Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default AddProducts;

