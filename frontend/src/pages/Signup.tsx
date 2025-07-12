import SignupForm from "@/components/auth/SignupForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Create a new account to get started.
          </CardDescription>
          <CardAction>
            <Link to="/login">
              <Button variant="outline" className="w-full mt-4">
                Log in
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
