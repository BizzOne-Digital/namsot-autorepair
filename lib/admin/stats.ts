import "server-only";
import { connectDB, toPlainArray } from "@/lib/db";
import {
  BlogPost,
  Booking,
  ContactMessage,
  GalleryItem,
  Order,
  PricingPlan,
  Product,
  Service,
  TeamMember,
  Testimonial,
} from "@/models";

export interface AdminStatsSummary {
  bookings: { total: number; pending: number; confirmed: number };
  messages: { total: number; unread: number };
  orders: { total: number; pending: number; revenue: number };
  catalog: {
    services: number;
    pricingPlans: number;
    products: number;
    blogPosts: number;
    teamMembers: number;
    testimonials: number;
    galleryItems: number;
  };
  recentBookings: RecentBooking[];
  recentMessages: RecentMessage[];
}

export interface RecentBooking {
  _id: string;
  customerName: string;
  serviceName: string;
  date: string;
  time: string;
  status: string;
  createdAt: string;
}

export interface RecentMessage {
  _id: string;
  name: string;
  subject: string;
  status: string;
  createdAt: string;
}

/** Aggregates the dashboard figures in a single round of parallel queries. */
export async function getAdminStats(): Promise<AdminStatsSummary> {
  await connectDB();

  const [
    bookingsTotal,
    bookingsPending,
    bookingsConfirmed,
    messagesTotal,
    messagesUnread,
    ordersTotal,
    ordersPending,
    revenueRows,
    services,
    pricingPlans,
    products,
    blogPosts,
    teamMembers,
    testimonials,
    galleryItems,
    recentBookings,
    recentMessages,
  ] = await Promise.all([
    Booking.countDocuments({}),
    Booking.countDocuments({ status: "pending" }),
    Booking.countDocuments({ status: "confirmed" }),
    ContactMessage.countDocuments({}),
    ContactMessage.countDocuments({ status: "new" }),
    Order.countDocuments({}),
    Order.countDocuments({ status: "pending" }),
    Order.aggregate<{ total: number }>([
      { $match: { status: { $in: ["paid", "shipped", "completed"] } } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]),
    Service.countDocuments({}),
    PricingPlan.countDocuments({}),
    Product.countDocuments({}),
    BlogPost.countDocuments({}),
    TeamMember.countDocuments({}),
    Testimonial.countDocuments({}),
    GalleryItem.countDocuments({}),
    Booking.find({})
      .select("customerName serviceName date time status createdAt")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
    ContactMessage.find({})
      .select("name subject status createdAt")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
  ]);

  return {
    bookings: {
      total: bookingsTotal,
      pending: bookingsPending,
      confirmed: bookingsConfirmed,
    },
    messages: { total: messagesTotal, unread: messagesUnread },
    orders: {
      total: ordersTotal,
      pending: ordersPending,
      revenue: revenueRows[0]?.total ?? 0,
    },
    catalog: {
      services,
      pricingPlans,
      products,
      blogPosts,
      teamMembers,
      testimonials,
      galleryItems,
    },
    recentBookings: toPlainArray<RecentBooking>(recentBookings),
    recentMessages: toPlainArray<RecentMessage>(recentMessages),
  };
}
