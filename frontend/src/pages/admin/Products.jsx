 import { Button } from "@/components/ui/button"
 import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "@/store/features/products/productSlice";
import moment from "moment";
 function Products() {
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProducts()); //get all product function
  }, [dispatch]);


  if (status == "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading Products... </p>
      </div>
    );
  }
  if (error == "error") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>An Unexpected Error Occurs While Loading Products</p>
      </div>
    );
  }

   return (
     <>
     <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl">Products</h1>
          <Link to="/admin/products/add">
          <Button>Add Product</Button>
          </Link>      
      </div>
      <div className="overflow-x-auto">
         <Table className="w-full border-collapse border border-gray-300">
          <TableHeader className="bg-gray-10" >
            <TableRow>
              <TableHead>Sr No.</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead >Added By</TableHead>
              <TableHead >Dated</TableHead>
              <TableHead >Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>           
           {products &&
            products.products &&
            products.products.map((product,index)=>{
              return(
              <>
              <TableRow key={product._id}>   

                   <TableCell>
                    {index+1}
                    </TableCell>
                   <TableCell>
                   <img
                      alt="Product"
                      className="h-16 w-16 object-cover rounded-md border mb-1"
                      height="64"
                      width="64"
                      src={product.picture.secure_url}
                    />
                   </TableCell>
                   <TableCell>
                    {product.title}
                   </TableCell>
                   <TableCell>
                    {product.description}
                   </TableCell>
                   <TableCell>
                    {product.price}
                   </TableCell>
                   <TableCell>
                    {product.category.name}
                   </TableCell>
                   <TableCell>
                    {product.user.name}
                   </TableCell>
                   <TableCell>
                    {moment(product.createdAt).format("DD-MM-YYYY")}
                   </TableCell>
                   
                   
                
                   <TableCell>
                     <DropdownMenu>
                       <DropdownMenuTrigger asChild>
                         <Button
                           aria-haspopup="true"
                           size="icon"
                           variant="ghost"
                         >
                           <MoreHorizontal className="h-4 w-4" />
                           <span className="sr-only">Toggle menu</span>
                         </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="end">
                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
                         <DropdownMenuItem>
                           <button
                             // onClick={() => {
                             //   navigate(
                             //     `/admin/categories/update/${category.slug}`
                             //   );
                             // }}
                           >
                             Edit
                           </button>
                         </DropdownMenuItem>
                         <DropdownMenuItem>
                           <button
                             // onClick={() => {
                             //   handleDelete(category.slug);
                             // }}
                           >
                             Delete
                           </button>
                         </DropdownMenuItem>
                       </DropdownMenuContent>
                     </DropdownMenu>
                   </TableCell>
                 </TableRow>
              
              </>
              )
            })
           }
                  
          </TableBody>
        </Table>
         </div>    
     </> 
   )
 }
 export default Products;