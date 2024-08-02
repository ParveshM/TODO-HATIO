import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { clearUser } from "@/redux/UserSlice";
import capitalize from "@/utils/capitalize";
import showToast from "@/utils/toaster";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, email } = useAppSelector((state) => state.user);
  return (
    <nav className="bg-white shadow-md rounded-md fixed top-0 left-0 right-0">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>
          {isAuthenticated && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative ml-3">
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      type="button"
                      className="relative flex items-center font-semibold justify-center w-10 h-10 rounded-full bg-indigo-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 "
                    >
                      {email ? capitalize(email[0]) : "U"}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-5">
                      <DropdownMenuItem
                        className="flex gap-2 cursor-pointer"
                        onClick={() => {
                          dispatch(clearUser());
                          showToast("Logout Success");
                        }}
                      >
                        <LogOut className="size-5 " /> Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;