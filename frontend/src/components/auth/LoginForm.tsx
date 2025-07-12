import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "@/api/axios";
import { useNavigate } from "react-router-dom";
import ToastComponent from "../misc/ToastComponent";
import { getAccessToken, setAccessToken } from "@/utils/tokenManager";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setLoading(true);
    try {
      const response = await api.post("/users/login", values);

      if (response.status === 200 || response.status === 201) {
        const { jwt_token } = response.data;

        setAccessToken(jwt_token);
        console.log(getAccessToken());

        toast.success("Login successful! Redirecting...");
        console.log("Login response:", response.data);

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error("Invalid email or password. Please try again.");
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </Button>
      </form>

      <ToastComponent />
    </Form>
  );
};

export default LoginForm;
