 import { Button } from "@/components/ui/button"
 function Orders() {
   return (
     <>
     <div className="flex items-center">
             <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
           </div>
           <div
             className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
           >
             <div className="flex flex-col items-center gap-1 text-center">
               <h3 className="text-2xl font-bold tracking-tight">
                 You have no products
               </h3>
               <p className="text-sm text-muted-foreground">
                 You can start selling as soon as you add a product.
               </p>
               <Button className="mt-4">Orders</Button>
             </div>
           </div>
     </> 
   )
 }
 export default Orders;