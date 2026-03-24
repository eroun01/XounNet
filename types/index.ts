// ─────────────────────────────────────────────────────────────────────────────
// COMMON
// ─────────────────────────────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export type Status = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING";
export type Currency = "UGX" | "USD" | "KES" | "TZS";
export type BillingCycle = "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "ANNUALLY";

// ─────────────────────────────────────────────────────────────────────────────
// AUTH / USER / ROLES
// ─────────────────────────────────────────────────────────────────────────────
export type UserRole =
  | "SUPER_ADMIN"
  | "ISP_ADMIN"
  | "BRANCH_MANAGER"
  | "FINANCE"
  | "SUPPORT"
  | "NOC"
  | "AGENT"
  | "CUSTOMER";

export interface Permission {
  id: string;
  resource: string;
  action: "create" | "read" | "update" | "delete" | "manage";
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  roleObj?: Role;
  ispId: string;
  branchId?: string;
  avatar?: string;
  twoFactorEnabled: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// ISP / BRANCH
// ─────────────────────────────────────────────────────────────────────────────
export interface ISP {
  id: string;
  name: string;
  domain: string;
  logo?: string;
  primaryColor?: string;
  country: string;
  currency: Currency;
  timezone: string;
  taxRate: number;
  taxNumber?: string;
  phone: string;
  email: string;
  address: string;
  isActive: boolean;
  plan: "STARTER" | "PROFESSIONAL" | "ENTERPRISE";
  createdAt: string;
}

export interface Branch {
  id: string;
  ispId: string;
  name: string;
  address: string;
  phone: string;
  managerId?: string;
  isActive: boolean;
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOMERS
// ─────────────────────────────────────────────────────────────────────────────
export type CustomerStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING_KYC";
export type CustomerType = "INDIVIDUAL" | "BUSINESS";

export interface CustomerAddress {
  street: string;
  village?: string;
  parish?: string;
  subcounty?: string;
  district: string;
  country: string;
  coordinates?: { lat: number; lng: number };
}

export interface KYC {
  nationalId?: string;
  nationalIdPhoto?: string;
  businessReg?: string;
  verified: boolean;
  verifiedAt?: string;
  verifiedBy?: string;
}

export interface Customer {
  id: string;
  ispId: string;
  branchId?: string;
  accountNumber: string;
  type: CustomerType;
  firstName: string;
  lastName: string;
  businessName?: string;
  email?: string;
  phone: string;
  altPhone?: string;
  address: CustomerAddress;
  status: CustomerStatus;
  creditScore: number; // 0-100
  kyc: KYC;
  notes?: string;
  tags: string[];
  referredBy?: string;
  agentId?: string;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// PLANS / PACKAGES
// ─────────────────────────────────────────────────────────────────────────────
export interface PlanSpeed {
  download: number; // Mbps
  upload: number; // Mbps
  burstDownload?: number;
  burstUpload?: number;
}

export interface Plan {
  id: string;
  ispId: string;
  name: string;
  description?: string;
  type: "DEDICATED" | "SHARED" | "HOTSPOT" | "VOUCHER";
  speed: PlanSpeed;
  dataLimit?: number; // bytes, null = unlimited
  billingCycle: BillingCycle;
  price: number;
  currency: Currency;
  setupFee: number;
  gracePeriodDays: number;
  suspendAfterDays: number;
  isActive: boolean;
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBSCRIPTIONS
// ─────────────────────────────────────────────────────────────────────────────
export type SubscriptionStatus =
  | "ACTIVE"
  | "SUSPENDED"
  | "EXPIRED"
  | "PENDING"
  | "GRACE"
  | "CANCELLED";

export interface Subscription {
  id: string;
  customerId: string;
  customer?: Customer;
  planId: string;
  plan?: Plan;
  ispId: string;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  nextBillingDate: string;
  ipAddress?: string;
  macAddress?: string;
  username?: string; // PPPoE / RADIUS username
  routerId?: string;
  dataUsed: number; // bytes
  autoRenew: boolean;
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// INVOICES
// ─────────────────────────────────────────────────────────────────────────────
export type InvoiceStatus = "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "CANCELLED" | "VOID";

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  taxable: boolean;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customer?: Customer;
  subscriptionId?: string;
  ispId: string;
  status: InvoiceStatus;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxAmount: number;
  taxRate: number;
  discount: number;
  total: number;
  currency: Currency;
  dueDate: string;
  paidAt?: string;
  notes?: string;
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// PAYMENTS
// ─────────────────────────────────────────────────────────────────────────────
export type PaymentMethod =
  | "MTN_MOMO"
  | "AIRTEL_MONEY"
  | "BANK_TRANSFER"
  | "CARD"
  | "WALLET"
  | "CASH";
export type PaymentStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | "REFUNDED";

export interface Payment {
  id: string;
  reference: string;
  customerId: string;
  customer?: Customer;
  invoiceId?: string;
  ispId: string;
  amount: number;
  currency: Currency;
  method: PaymentMethod;
  status: PaymentStatus;
  gatewayRef?: string;
  gatewayResponse?: Record<string, unknown>;
  phone?: string; // for mobile money
  failureReason?: string;
  retryCount: number;
  processedAt?: string;
  createdAt: string;
}

export interface Wallet {
  id: string;
  ownerId: string;
  ownerType: "CUSTOMER" | "AGENT";
  balance: number;
  currency: Currency;
  lastTransaction?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// NETWORK – ROUTERS
// ─────────────────────────────────────────────────────────────────────────────
export type RouterStatus = "ONLINE" | "OFFLINE" | "DEGRADED" | "MAINTENANCE";

export interface RouterInterface {
  name: string;
  type: "ether" | "wlan" | "bridge" | "vlan" | "pppoe";
  macAddress: string;
  ipAddress?: string;
  running: boolean;
  disabled: boolean;
  txBps: number;
  rxBps: number;
}

export interface Router {
  id: string;
  ispId: string;
  branchId?: string;
  name: string;
  model: string;
  version: string;
  ipAddress: string;
  apiPort: number;
  status: RouterStatus;
  uptime: number; // seconds
  cpuLoad: number; // percent
  memUsed: number; // percent
  freeDisk: number; // bytes
  temperature?: number;
  interfaces: RouterInterface[];
  activeSessions: number;
  location?: string;
  coordinates?: { lat: number; lng: number };
  lastSeen: string;
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// NETWORK – SESSIONS
// ─────────────────────────────────────────────────────────────────────────────
export interface NetworkSession {
  id: string;
  customerId?: string;
  username: string;
  ipAddress: string;
  macAddress: string;
  routerId: string;
  type: "PPPOE" | "HOTSPOT" | "STATIC";
  uptime: number; // seconds
  txBytes: number;
  rxBytes: number;
  txBps: number;
  rxBps: number;
  connectedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// NETWORK – IP MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────
export interface IPPool {
  id: string;
  ispId: string;
  name: string;
  network: string; // e.g. "192.168.1.0/24"
  gateway: string;
  dns1: string;
  dns2?: string;
  total: number;
  used: number;
  routerId?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// VOUCHERS
// ─────────────────────────────────────────────────────────────────────────────
export type VoucherStatus = "AVAILABLE" | "ACTIVE" | "EXPIRED" | "USED" | "VOID";

export interface Voucher {
  id: string;
  code: string;
  batchId: string;
  planId: string;
  plan?: Plan;
  ispId: string;
  status: VoucherStatus;
  usedBy?: string;
  usedAt?: string;
  expiresAt?: string;
  price: number;
  currency: Currency;
  createdAt: string;
}

export interface VoucherBatch {
  id: string;
  ispId: string;
  planId: string;
  plan?: Plan;
  name: string;
  count: number;
  generated: number;
  sold: number;
  used: number;
  prefix: string;
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// AGENTS / RESELLERS
// ─────────────────────────────────────────────────────────────────────────────
export type AgentStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export interface Agent {
  id: string;
  ispId: string;
  parentAgentId?: string;
  userId: string;
  user?: User;
  name: string;
  phone: string;
  email?: string;
  status: AgentStatus;
  level: number; // 1 = direct, 2 = sub-agent, etc.
  commissionRate: number; // percent
  wallet: Wallet;
  totalSales: number;
  totalCommission: number;
  customers: number;
  createdAt: string;
}

export interface Commission {
  id: string;
  agentId: string;
  paymentId: string;
  amount: number;
  rate: number;
  status: "PENDING" | "PAID";
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SUPPORT / TICKETING
// ─────────────────────────────────────────────────────────────────────────────
export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type TicketPriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type TicketCategory =
  | "CONNECTIVITY"
  | "BILLING"
  | "SPEED"
  | "INSTALLATION"
  | "EQUIPMENT"
  | "OTHER";

export interface TicketComment {
  id: string;
  ticketId: string;
  userId: string;
  user?: User;
  body: string;
  isInternal: boolean;
  createdAt: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  ispId: string;
  customerId?: string;
  customer?: Customer;
  assignedTo?: string;
  assignee?: User;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  comments: TicketComment[];
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkOrder {
  id: string;
  ispId: string;
  ticketId?: string;
  customerId?: string;
  customer?: Customer;
  assignedTo?: string;
  type: "INSTALLATION" | "MAINTENANCE" | "UPGRADE" | "REMOVAL";
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  scheduledAt: string;
  completedAt?: string;
  notes?: string;
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMMUNICATIONS
// ─────────────────────────────────────────────────────────────────────────────
export type CommChannel = "SMS" | "WHATSAPP" | "EMAIL" | "PUSH";

export interface MessageTemplate {
  id: string;
  ispId: string;
  name: string;
  channel: CommChannel;
  subject?: string;
  body: string;
  variables: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Campaign {
  id: string;
  ispId: string;
  name: string;
  templateId: string;
  channel: CommChannel;
  targetSegment: string;
  status: "DRAFT" | "SCHEDULED" | "RUNNING" | "COMPLETED" | "CANCELLED";
  scheduledAt?: string;
  sentCount: number;
  failedCount: number;
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECURITY / AUDIT
// ─────────────────────────────────────────────────────────────────────────────
export interface AuditLog {
  id: string;
  ispId: string;
  userId: string;
  user?: User;
  action: string;
  resource: string;
  resourceId?: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}

export interface FraudAlert {
  id: string;
  ispId: string;
  type:
    | "ACCOUNT_SHARING"
    | "UNUSUAL_TRAFFIC"
    | "MULTIPLE_LOGINS"
    | "PAYMENT_ANOMALY";
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  customerId?: string;
  customer?: Customer;
  description: string;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// ANALYTICS
// ─────────────────────────────────────────────────────────────────────────────
export interface RevenueDataPoint {
  date: string;
  revenue: number;
  target: number;
  collected: number;
}

export interface ChurnDataPoint {
  month: string;
  churned: number;
  acquired: number;
  net: number;
}

export interface KPIMetrics {
  totalRevenue: number;
  revenueChange: number; // percent vs last period
  activeCustomers: number;
  customersChange: number;
  activeSessions: number;
  sessionsChange: number;
  pendingInvoices: number;
  pendingAmount: number;
  avgBandwidth: number;
  networkUptime: number;
  arpu: number; // average revenue per user
  churnRate: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// NOC / REAL-TIME
// ─────────────────────────────────────────────────────────────────────────────
export interface BandwidthDataPoint {
  ts: number;
  txBps: number;
  rxBps: number;
}

export interface NetworkAlert {
  id: string;
  routerId: string;
  router?: Router;
  type:
    | "ROUTER_DOWN"
    | "HIGH_CPU"
    | "HIGH_MEMORY"
    | "HIGH_TEMPERATURE"
    | "LINK_DOWN"
    | "HIGH_BANDWIDTH";
  severity: "INFO" | "WARNING" | "CRITICAL";
  message: string;
  resolved: boolean;
  createdAt: string;
}
