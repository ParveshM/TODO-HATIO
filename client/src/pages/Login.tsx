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
import { BASE_URL } from "@/constants";
import { useAppDispatch } from "@/redux/Store";
import { setUser } from "@/redux/UserSlice";
import { setItem } from "@/utils/localStorageUtil";
import showToast from "@/utils/toaster";
import { loginValidationSchema } from "@/utils/validation";
import axios from "axios";
import { useFormik } from "formik";
import { jwtDecode } from "jwt-decode";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);
      axios
        .post(BASE_URL + "/login", values)
        .then(({ data }) => {
          const { message, access_token } = data;
          const user = jwtDecode(access_token);
          showToast(message, "success");
          dispatch(setUser({ ...user, isAuthenticated: true }));
          navigate("/");
          setItem("access_token", access_token);
        })
        .catch(({ response }) => {
          const { message } = response?.data;
          setIsSubmitting(false);
          showToast(message, "error");
        })
        .finally(() => setIsSubmitting(false));
    },
  });

  return (
    <div className="flex justify-center items-center h-[98vh]">
      <Card className="w-[350px] shadow-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  placeholder="johndoe@gmail.com"
                  {...formik.getFieldProps("email")}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-red-500">{formik.errors.email}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative ">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    {...formik.getFieldProps("password")}
                    className="pr-9"
                  />
                  {showPassword ? (
                    <Eye
                      className="absolute size-5 top-2 right-2 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <EyeOff
                      className="absolute size-5 top-2 right-2 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
                {formik.errors.password && formik.touched.password && (
                  <p className="text-red-500">{formik.errors.password}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="mt-2 flex justify-center items-center">
                <Button
                  className="w-full"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
              <p className="flex justify-center">
                Don't have an account ?
                <Link to="/signup">
                  <span className="pl-1 font-semibold hover:underline">
                    Signup
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
