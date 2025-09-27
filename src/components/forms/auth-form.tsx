import { cn } from "@/lib/utils";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import MyImage from "../my-image";
import { H4, Small, XSmall } from "../typography";

import { Button } from "../ui/button";

const AuthForm = ({
  children,
  type,
  className,
}: {
  children: React.ReactNode;
  type: "login" | "signup";
  className?: string;
}) => {
  const login = type === "login";

  return (
    <div
      className={cn(
        "h-screen flex items-center justify-center relative bg-secondary",
        className
      )}
    >
      {/* Background Image */}
      <MyImage
        src={`/images/${type}.jpg`}
        alt={type}
        fill
        className="absolute inset-0 object-cover"
        hasBaseUrl={false}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Form Container */}
      <div className="relative z-10 space-y-4 p-4 md:p-8 bg-background/80 backdrop-blur-md rounded-md shadow-lg w-full max-w-xs">
        <div className="flex flex-col gap-4">
          <H4>{login ? "Login to your account" : "Create an account"}</H4>
          <XSmall>
            {login
              ? "Enter to continue and explore within your grasp"
              : "Follow the instructions to make it easier to register and you will be able to explore inside."}
          </XSmall>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col items-center justify-center w-full">
          {children}
        </div>

        {/* Switch Auth Mode */}
        <div className="text-center flex flex-col gap-4">
          <small>
            {login ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              href={`/auth/${login ? "signup" : "login"}`}
              className="text-signature font-semibold"
            >
              {login ? "Sign Up" : "Login"}
            </Link>
          </small>
          {/* Contact Us Link */}
          <Link
            href="/contact-us"
            className="text-xs text-signature font-semibold mt-4 block"
          >
            Contact Us
          </Link>
          
          {/* <>
            <small>Or {login ? "Login" : "Sign Up"} with </small>
            <div className="flex items-center justify-between gap-2 w-full">
              <Button
                variant="ghost"
                className="flex-1 border border-muted-foreground flex items-center gap-2"
              >
                <FcGoogle />
                <span>Google</span>
              </Button>
            </div>
          </> */}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
