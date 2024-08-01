import { z } from "zod";

export const userSchema = z.object({
	first_name: z
		.string({ required_error: "First name is required" })
		.min(1, { message: "First name is required" })
		.trim(),
	last_name: z
		.string({ required_error: "Last name is required" })
		.min(1, { message: "Last name is required" })
		.trim(),
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Please enter a valid email address" }),
	password: z
		.string({ required_error: "Password is required" })
		.min(8, { message: "Password must be at least 8 characters" })
		.trim(),
	confirm_password: z
		.string({ required_error: "Confirm password is required" })
		.min(8, { message: "Password must be at least 8 characters" })
		.trim(),
	terms: z.literal(true, {
		errorMap: () => ({ message: "You must agree to the terms and conditions" }),
	}),
});

export const newsletterSchema = z.object({
	first_name: z.string().optional(),
	last_name: z.string().optional(),
	email: z.string({ required_error: "Email is required" }).email({ message: "Please enter a valid email address" }),
});

export const userUpdatePasswordSchema = userSchema.pick({
	password: true,
	confirm_password: true,
}).superRefine(({ confirm_password, password }, ctx) => {
	if(password !== confirm_password) {
		ctx.addIssue({
			code: "custom",
			message: "Password and Confirm Password must match",
			path: ["password"]
		});
		ctx.addIssue({
			code: "custom",
			message: "Password and Confirm Password must match",
			path: ["confirm_password"]
		});
	}
});

export const registerFormSchema = z.object({
	first_name: z.string({ required_error: "First name is required" }).min(1, { message: "First name is required" }).trim(),
	last_name: z.string({ required_error: "Last name is required" }).min(1, { message: "Last name is required" }).trim(),
	// company: z.string({ required_error: "Company name is required" }).min(1, { message: "Company name is required" }).trim(),
	email: z.string({ required_error: "Email is required" }).email({ message: "Please enter a valid email address" }),
	password: z.string({ required_error: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }).trim(),
	// confirm_password: z.string({ required_error: "Confirm password is required" }).min(8, { message: "Password must be at least 8 characters" }).trim(),
	terms: z.literal(true, {
		errorMap: () => ({ message: "You must agree to the terms and conditions" }),
	}),
});

export const lineItemsSchema = z.object({
	price: z.string({ required_error: "Price ID is required" }),
	quantity: z.number({ required_error: "Quantity is required" }),
});

export const checkoutSessionSchema = z.object({
	customer: z.string({ required_error: "Customer ID is required" }),
	line_items: z.array(lineItemsSchema),
	mode: z.literal("payment", "subscription"),
	return_url: z.string({ required_error: "Return URL is required" }),
	success_url: z.string({ required_error: "Success URL is required" }),
});

export const creditsSchema = z.object({
	customer: z.string({ required_error: "Customer ID is required" }),
	product_id: z.string({ required_error: "Product ID is required" }),
	price: z.number({ required_error: "Price  is required" }),
	mode: z.literal("payment", "subscription"),
	return_url: z.string({ required_error: "Return URL is required" }),
	success_url: z.string({ required_error: "Success URL is required" }),
});