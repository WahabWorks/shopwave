 import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
 function Products() {
   return (
     <>
     <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl">Products</h1>
          <Link to="/admin/products/add">
          <Button>Add Product</Button>
          
          </Link>
      
      </div>    
     </> 
   )
 }
 export default Products;