import { ApiError, apiError, apiSuccess } from "@/lib/api/response";
import { connectDB, isDbConfigured } from "@/lib/db";
import { bookingFormSchema } from "@/lib/validation/schemas";
import { Booking, Service } from "@/models";

export async function POST(request: Request) {
  try {
    if (!isDbConfigured()) {
      throw new ApiError(
        503,
        "Online booking is temporarily unavailable. Please call us instead.",
        "DATABASE_NOT_CONFIGURED",
      );
    }

    const data = bookingFormSchema.parse(await request.json());

    await connectDB();

    const service = await Service.findOne({
      slug: data.serviceSlug.toLowerCase(),
      isActive: true,
    })
      .select("_id name slug")
      .lean();

    if (!service) {
      throw new ApiError(
        400,
        "That service is no longer available. Please choose another.",
        "SERVICE_UNAVAILABLE",
      );
    }

    const booking = await Booking.create({
      serviceSlug: service.slug,
      serviceName: service.name,
      serviceId: service._id,
      date: data.date,
      time: data.time,
      customerName: data.name,
      email: data.email,
      phone: data.phone,
      vehicleMake: data.vehicleMake,
      vehicleModel: data.vehicleModel,
      vehicleYear: data.vehicleYear,
      message: data.message,
      status: "pending",
    });

    return apiSuccess(
      {
        _id: booking._id.toString(),
        serviceName: booking.serviceName,
        date: booking.date,
        time: booking.time,
      },
      201,
    );
  } catch (error) {
    return apiError(error);
  }
}
