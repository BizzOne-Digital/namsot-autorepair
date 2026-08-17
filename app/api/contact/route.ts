import { ApiError, apiError, apiSuccess } from "@/lib/api/response";
import { connectDB, isDbConfigured } from "@/lib/db";
import { contactFormSchema } from "@/lib/validation/schemas";
import { ContactMessage } from "@/models";

export async function POST(request: Request) {
  try {
    if (!isDbConfigured()) {
      throw new ApiError(
        503,
        "The contact form is temporarily unavailable. Please email or call us instead.",
        "DATABASE_NOT_CONFIGURED",
      );
    }

    const data = contactFormSchema.parse(await request.json());

    await connectDB();

    const message = await ContactMessage.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      status: "new",
    });

    return apiSuccess({ _id: message._id.toString() }, 201);
  } catch (error) {
    return apiError(error);
  }
}
