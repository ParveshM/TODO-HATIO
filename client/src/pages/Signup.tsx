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
import showToast from "@/utils/toaster";
import { signupValidationSchema } from "@/utils/validation";
import axios from "axios";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: ({ email, password }) => {
      setIsSubmitting(true);
      axios
        .post(BASE_URL + "/signup", { email, password })
        .then(({ data }) => {
          showToast(data.message);
          navigate("/login");
        })
        .catch(({ response }) => {
          const { message } = response.data;
          setIsSubmitting(false);
          showToast(message, "error");
        })
        .finally(() => setIsSubmitting(false));
    },
  });
  return (
    <div className="flex justify-center items-center h-[98vh]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="mb-0">
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  placeholder="Re-enter password"
                  {...formik.getFieldProps("confirmPassword")}
                />
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <p className="text-red-500">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="mt-2 flex justify-center items-center">
                <Button
                  className="w-full"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
              <Link to="/login" className="flex justify-center">
                <p>
                  Already have an account ?{" "}
                  <span className="font-semibold hover:underline">Login</span>
                </p>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
