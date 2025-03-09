import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '@/store/features/auth/authSlice';


export default function RegisterPage({ className, ...props }) {
  const [inputValues, setInputValues] = useState({});
  const {status} = useSelector((state)=>state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValues(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(inputValues))
        .unwrap()
        .then((response)=>{
          if(response?.success == true){
            toast.success(response?.message, {autoClose:1000})
            setTimeout(() => {
              navigate("/")
            }, 1000);
          }else{
            toast.error(response?.message, {autoClose:1000})
          }
    
        })
        .catch((error)=>{
          toast.error(error, {autoClose:1000})
          
        })
        setInputValues({})

  }

  return (
    <div className={cn("h-screen flex justify-center items-center", className)} {...props}>
      <Card className="w-80  ">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                  id="full-name"
                  type="full-name"
                  placeholder=" CR7"
                  required
                  name="name"
                  value={inputValues.name || ""}
                  onChange={handleChange}
                />
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                  value={inputValues.email || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password"
                  placeholder="*******"
                  type="password"
                  required
                  name="password"
                  value={inputValues.password || ""}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full" disabled={status == "loading" ? true :false}>
              {status == "loading" ? "Creating Account...":"Create Account"}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
