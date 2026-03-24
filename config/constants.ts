export const APP_NAME = "XounNet ISP OS";
export const APP_VERSION = "1.0.0";
export const APP_DESCRIPTION =
  "Next-generation ISP billing, network automation & customer management platform";

// API
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
export const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:4000";

// Pagination
export const DEFAULT_PAGE_SIZE = 25;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// Currencies
export const CURRENCIES = [
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

// Billing cycles
export const BILLING_CYCLES = [
  { value: "DAILY", label: "Daily" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "MONTHLY", label: "Monthly" },
  { value: "QUARTERLY", label: "Quarterly" },
  { value: "ANNUALLY", label: "Annually" },
] as const;

// Payment methods
export const PAYMENT_METHODS = [
  { value: "MTN_MOMO", label: "MTN Mobile Money", icon: "📱" },
  { value: "AIRTEL_MONEY", label: "Airtel Money", icon: "📱" },
  { value: "BANK_TRANSFER", label: "Bank Transfer", icon: "🏦" },
  { value: "CARD", label: "Visa / Mastercard", icon: "💳" },
  { value: "WALLET", label: "Internal Wallet", icon: "👛" },
  { value: "CASH", label: "Cash", icon: "💵" },
] as const;

// Subscription statuses
export const SUBSCRIPTION_STATUSES = {
  ACTIVE: { label: "Active", color: "success" },
  SUSPENDED: { label: "Suspended", color: "danger" },
  EXPIRED: { label: "Expired", color: "warning" },
  PENDING: { label: "Pending", color: "info" },
  GRACE: { label: "Grace Period", color: "warning" },
  CANCELLED: { label: "Cancelled", color: "surface-400" },
} as const;

// Customer statuses
export const CUSTOMER_STATUSES = {
  ACTIVE: { label: "Active", color: "success" },
  INACTIVE: { label: "Inactive", color: "surface-400" },
  SUSPENDED: { label: "Suspended", color: "danger" },
  PENDING_KYC: { label: "Pending KYC", color: "warning" },
} as const;

// Ticket priorities
export const TICKET_PRIORITIES = {
  CRITICAL: { label: "Critical", color: "danger" },
  HIGH: { label: "High", color: "warning" },
  MEDIUM: { label: "Medium", color: "info" },
  LOW: { label: "Low", color: "surface-400" },
} as const;

// Ticket statuses
export const TICKET_STATUSES = {
  OPEN: { label: "Open", color: "info" },
  IN_PROGRESS: { label: "In Progress", color: "warning" },
  RESOLVED: { label: "Resolved", color: "success" },
  CLOSED: { label: "Closed", color: "surface-400" },
} as const;

// Router types
export const ROUTER_TYPES = [
  { value: "MIKROTIK", label: "MikroTik RouterOS" },
  { value: "CISCO", label: "Cisco IOS" },
  { value: "JUNIPER", label: "Juniper" },
  { value: "UBIQUITI", label: "Ubiquiti EdgeOS" },
] as const;

// NAV items (used by sidebar)
export const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/", icon: "LayoutDashboard" },
      { label: "NOC Monitor", href: "/noc", icon: "Activity" },
      { label: "Analytics", href: "/analytics", icon: "BarChart3" },
    ],
  },
  {
    label: "Customers",
    items: [
      { label: "Customers", href: "/customers", icon: "Users" },
      { label: "Billing", href: "/billing", icon: "FileText" },
      { label: "Payments", href: "/payments", icon: "CreditCard" },
    ],
  },
  {
    label: "Network",
    items: [
      { label: "Network", href: "/network", icon: "Network" },
      { label: "Vouchers", href: "/vouchers", icon: "Ticket" },
    ],
  },
  {
    label: "Business",
    items: [
      { label: "Agents", href: "/agents", icon: "UserCheck" },
      { label: "Support", href: "/support", icon: "LifeBuoy" },
      { label: "Communications", href: "/communications", icon: "MessageSquare" },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Security", href: "/security", icon: "Shield" },
      { label: "Settings", href: "/settings", icon: "Settings" },
    ],
  },
] as const;
