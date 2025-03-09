import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GetSingleCategory, UpdatingCategory } from "@/store/features/categories/categoriesSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateCategory() {
      const [catName, setCatName] = useState({});
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const {slug} = useParams();

      const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(UpdatingCategory({name: catName,slug}))
          .unwrap()
          .then((response) => {
            if (response?.success == true) {
              toast.success(response?.message, { autoClose: 1000 });
              navigate("/admin/categories")
            } else {
              toast.error(response?.message, { autoClose: 1000 });
            }
          })
          .catch((error) => {
            toast.error(error, { autoClose: 1000 });
          });
        
      };

      useEffect(()=>{
         dispatch(GetSingleCategory(slug))
          .unwrap()
          .then((response) => {
            if (response?.success == true) {

              setCatName(response.category?.name);
            } else {
              toast.error(response?.message, { autoClose: 1000 });
            }
          })
          .catch((error) => {
            toast.error(error, { autoClose: 1000 });
          });
        
      },[dispatch,slug])

  return (
    <div>
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Update Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex ">
              <Input
                className="me-2"
                type="text"
                required
                name="name"
                value={catName}
                onChange={(e)=>{
                   setCatName( e.target.value);
                }}
              />
              <Button>Update Category</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default UpdateCategory;
