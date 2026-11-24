import React, { useState } from 'react';
import {
  ReceiptText,
  Wallet,
  CreditCard,
  Receipt,
  FileCheck,
  AlertCircle,
  RotateCcw,
  Search,
  Plus,
  Eye,
  CheckCircle2,
  Printer,
  Calendar,
  Send,
  Building2,
  Trash2,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { PieChartWidget } from '../charts/PieChartWidget';
import { BarChartWidget } from '../charts/BarChartWidget';
import { RevenueExpenseChartWidget } from '../charts/RevenueExpenseChartWidget';
import {
  monthlyRevenueBarData,
  paymentMethodsPieData,
  monthlyCollectionBarData,
  revenueVsExpensesData
} from '../../data/mockData';

export const BillingFinanceView = () => {
  const {
    stats,
    bills,
    payments,
    refunds,
    billingSubTab,
    navigateTo,
    createBill,
    patients,
    charges,
    setIsCreateBillModalOpen,
    setSelectedInvoice,
    setIsInvoiceModalOpen,
    markBillPaid,
    showToast
  } = useHospital();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

      {/* Primary Financial KPI Ribbon */}
      <div className="stats-grid-4 mb-4">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Total Billed</span>
            <div className="stat-icon-pill icon-blue">
              <ReceiptText size={20} />
            </div>
          </div>
          <div className="stat-value font-mono">₦{totalBilled.toLocaleString()}</div>
          <div className="stat-footer">
            <span className="stat-period">Cumulative Invoices</span>
          </div>
        </div>

        <div className="stat-card stat-card-highlight">
          <div className="stat-card-header">
            <span className="stat-label">Total Collected</span>
            <div className="stat-icon-pill icon-teal">
              <Wallet size={20} />
            </div>
          </div>
          <div className="stat-value font-mono text-teal">₦{totalCollected.toLocaleString()}</div>
          <div className="stat-footer">
            <span className="stat-badge-teal">89.1% Recovery Rate</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Pending Due</span>
            <div className="stat-icon-pill icon-amber">
              <AlertCircle size={20} />
            </div>
          </div>
          <div className="stat-value font-mono text-amber">₦{totalPending.toLocaleString()}</div>
          <div className="stat-footer">
            <span className="stat-badge-amber">Awaiting Settlement</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Daily Collection (Today)</span>
            <div className="stat-icon-pill icon-revenue">
              <CreditCard size={20} />
            </div>
          </div>
          <div className="stat-value font-mono text-navy">₦{dailyCollection.toLocaleString()}</div>
          <div className="stat-footer">
            <span className="stat-badge-info">POS & NIP Verified</span>
          </div>
        </div>
      </div>

      {/* Tab 1: Invoices (All Bills Table) + Bar Chart for Monthly Revenue */}
      {billingSubTab === 'overview' && (
        <div className="space-y-4">
          {/* Bar Chart for Monthly Revenue */}
          <div className="content-card p-4">
            <div className="card-header-bar mb-3">
              <div className="card-header-title">
                <TrendingUp size={18} className="text-teal" />
                <div>
                  <h3>Monthly Hospital Invoiced Revenue (₦)</h3>
                  <p className="card-subtext">Cumulative billing revenue trajectory across recent months</p>
                </div>
              </div>
              <span className="badge badge-teal">Current Month: ₦4,285,000</span>
            </div>
            <BarChartWidget data={monthlyRevenueBarData} valuePrefix="₦" barColor="#00C2FF" />
          </div>

          <div className="content-card">
            <div className="table-filter-bar">
              <div className="search-box">
                <Search size={16} className="text-muted" />
                <input
                  type="text"
                  placeholder="Search invoice # or patient name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <span className="filter-label">Filter:</span>
                {['All', 'Paid', 'Partial', 'Unpaid'].map((st) => (
                  <button
                    key={st}
                    className={`filter-chip ${statusFilter === st ? 'active' : ''}`}
                    onClick={() => setStatusFilter(st)}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="table-responsive">
              <table className="naira-table">
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Patient Name</th>
                    <th>Date</th>
                    <th>Services Summary</th>
                    <th className="text-right">Total (₦)</th>
                    <th className="text-right">Paid (₦)</th>
                    <th className="text-right">Due (₦)</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBills.map((b) => (
                    <tr key={b.invoiceNo}>
                      <td className="font-mono text-teal font-bold">{b.invoiceNo}</td>
                      <td>
                        <strong>{b.patientName}</strong>
                      </td>
                      <td className="font-mono text-sm">{b.date}</td>
                      <td className="text-sm max-w-xs truncate" title={b.services}>
                        {b.services}
                      </td>
                      <td className="text-right font-mono font-bold">₦{b.amount.toLocaleString()}</td>
                      <td className="text-right font-mono text-emerald">₦{b.paid.toLocaleString()}</td>
                      <td className="text-right font-mono text-rose font-bold">₦{b.due.toLocaleString()}</td>
                      <td>
                        <span className={`status-pill pill-${b.status.toLowerCase()}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="text-right">
                        <div className="action-buttons-row justify-end">
                          <button
                            className="btn-icon-view"
                            title="Open Invoice & Receipt"
                            onClick={() => handleOpenInvoice(b)}
                          >
                            <Eye size={16} />
                          </button>
                          {b.due > 0 && (
                            <button
                              className="btn-icon-check"
                              title="Mark as Paid"
                              onClick={() => markBillPaid(b.invoiceNo)}
                            >
                              <CheckCircle2 size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: New Bill Form */}
      {billingSubTab === 'createBill' && (
        <div className="content-card max-w-4xl mx-auto p-4">
          <div className="card-header-bar mb-4">
            <div className="card-header-title">
              <Receipt size={20} className="text-teal" />
              <div>
                <h3>Create New Hospital Invoice</h3>
                <p className="card-subtext">Add consultation fees, surgical procedures, and laboratory tests</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleInlineBillSubmit}>
            <div className="form-grid mb-4">
              <div className="form-group">
                <label>Patient Name *</label>
                <input
                  type="text"
                  list="patientOptions"
                  placeholder="Type or select patient"
                  value={inlinePatientName}
                  onChange={(e) => setInlinePatientName(e.target.value)}
                  className="form-control"
                  required
                />
                <datalist id="patientOptions">
                  {patients.map((p) => (
                    <option key={p.id} value={p.name}>{p.id} - {p.name}</option>
                  ))}
                </datalist>
              </div>

              <div className="form-group">
                <label>Payment Method *</label>
                <select
                  value={inlineMethod}
                  onChange={(e) => setInlineMethod(e.target.value)}
                  className="form-control"
                >
                  <option value="POS Card Payment">POS Terminal (Stanbic/Zenith)</option>
                  <option value="Bank Transfer (GTBank)">GTBank NIP Instant Transfer</option>
                  <option value="Cash Deposit">Hospital Cash Desk</option>
                  <option value="HMO Insurance (Leadway)">Leadway Health HMO</option>
                  <option value="HMO Insurance (AXA Mansard)">AXA Mansard Insurance</option>
                </select>
              </div>
            </div>

            {/* Line Items */}
            <div className="line-items-wrapper">
              <div className="line-items-header">
                <span className="col-desc">Service / Treatment</span>
                <span className="col-qty">Qty</span>
                <span className="col-rate">Rate (₦)</span>
                <span className="col-total">Line Total (₦)</span>
                <span className="col-del"></span>
              </div>

              {inlineItems.map((item, idx) => (
                <div key={idx} className="line-item-row">
                  <div className="col-desc">
                    <select
                      value={item.name}
                      onChange={(e) => handleItemChange(idx, 'service', e.target.value)}
                      className="form-control form-control-sm"
                    >
                      {charges.map((c) => (
                        <option key={c.code} value={c.service}>
                          {c.service} (₦{c.fee.toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-qty">
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => handleItemChange(idx, 'qty', e.target.value)}
                      className="form-control form-control-sm text-center"
                    />
                  </div>
                  <div className="col-rate">
                    <input
                      type="number"
                      min="0"
                      value={item.rate}
                      onChange={(e) => handleItemChange(idx, 'rate', e.target.value)}
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="col-total font-mono font-bold">
                    ₦{(item.qty * item.rate).toLocaleString()}
                  </div>
                  <div className="col-del">
                    {inlineItems.length > 1 && (
                      <button
                        type="button"
                        className="btn-icon-danger"
                        onClick={() => handleRemoveItem(idx)}
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-outline-teal btn-sm mt-3"
                onClick={handleAddItem}
              >
                <Plus size={14} /> Add Service Line
              </button>
            </div>

            {/* Calculation Card */}
            <div className="invoice-totals-card mt-4">
              <div className="totals-row">
                <span>Subtotal:</span>
                <span className="font-mono">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="totals-row">
                <span>VAT (7.5%):</span>
                <span className="font-mono">₦{vat.toLocaleString()}</span>
              </div>
              <div className="totals-row grand-total">
                <span>Grand Total:</span>
                <span className="font-mono text-teal">₦{grandTotal.toLocaleString()}</span>
              </div>

              <div className="payment-status-toggle mt-3">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={inlineIsPaid}
                    onChange={(e) => setInlineIsPaid(e.target.checked)}
                  />
                  <span>Mark as Paid & Disburse Receipt Immediately</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigateTo('billing', 'overview')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-teal-primary">
                Generate Official Invoice
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Payments + Charts (Pie: Payment Methods, Bar: Monthly Collection) */}
      {billingSubTab === 'payments' && (
        <div className="space-y-4">
          <div className="dashboard-grid-layout">
            <div className="content-card">
              <div className="card-header-bar">
                <div className="card-header-title">
                  <CreditCard size={18} className="text-teal" />
                  <div>
                    <h3>Payment Methods Breakdown</h3>
                    <p className="card-subtext">POS cards, HMO insurance, and instant NIP bank transfers</p>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <PieChartWidget
                  data={paymentMethodsPieData}
                  prefix="₦"
                  centerTitle="₦4.28M"
                  centerSubtitle="Total Received"
                />
              </div>
            </div>

            <div className="content-card">
              <div className="card-header-bar">
                <div className="card-header-title">
                  <Wallet size={18} className="text-teal" />
                  <div>
                    <h3>Monthly Collection Volume (₦)</h3>
                    <p className="card-subtext">Recovered cash and settled digital payments</p>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <BarChartWidget data={monthlyCollectionBarData} valuePrefix="₦" barColor="#10B981" />
              </div>
            </div>
          </div>

          <div className="content-card">
            <div className="card-header-bar">
              <div className="card-header-title">
                <FileCheck size={18} className="text-teal" />
                <div>
                  <h3>Hospital Receipts & Payment Records</h3>
                  <p className="card-subtext">Verified financial inflows through POS terminals, NIP transfers, and cash desk</p>
                </div>
              </div>
              <span className="badge badge-success">All Transactions Audited</span>
            </div>

            <div className="table-responsive">
              <table className="naira-table">
                <thead>
                  <tr>
                    <th>Transaction Ref</th>
                    <th>Invoice Ref</th>
                    <th>Patient</th>
                    <th>Date & Time</th>
                    <th>Gateway / Method</th>
                    <th>Cashier</th>
                    <th className="text-right">Amount (₦)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.ref}>
                      <td className="font-mono text-teal font-bold">{p.ref}</td>
                      <td className="font-mono">{p.invoiceNo}</td>
                      <td><strong>{p.patient}</strong></td>
                      <td className="font-mono text-sm">{p.date}</td>
                      <td>
                        <span className="badge badge-dept">{p.method}</span>
                      </td>
                      <td>{p.cashier}</td>
                      <td className="text-right font-mono font-bold text-teal">
                        ₦{p.amount.toLocaleString()}
                      </td>
                      <td>
                        <span className="badge badge-success">Verified</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Insurance & Pending Payments */}
      {billingSubTab === 'pending' && (
        <div className="content-card">
          <div className="card-header-bar">
            <div className="card-header-title">
              <AlertCircle size={18} className="text-amber" />
              <div>
                <h3>Outstanding Balances & HMO Insurance Invoices</h3>
                <p className="card-subtext">Send automatic SMS/Email payment reminders or collect settlement</p>
              </div>
            </div>
            <span className="badge badge-warning">₦{totalPending.toLocaleString()} Total Overdue</span>
          </div>

          <div className="table-responsive">
            <table className="naira-table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Patient Name</th>
                  <th>Billed Date</th>
                  <th>Services Rendered</th>
                  <th className="text-right">Total (₦)</th>
                  <th className="text-right">Outstanding Due (₦)</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingBills.map((b) => (
                  <tr key={b.invoiceNo}>
                    <td className="font-mono text-teal font-bold">{b.invoiceNo}</td>
                    <td><strong>{b.patientName}</strong></td>
                    <td className="font-mono">{b.date}</td>
                    <td className="text-sm">{b.services}</td>
                    <td className="text-right font-mono">₦{b.amount.toLocaleString()}</td>
                    <td className="text-right font-mono text-rose font-bold">₦{b.due.toLocaleString()}</td>
                    <td className="text-right">
                      <div className="action-buttons-row justify-end">
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => showToast(`Payment reminder SMS dispatched to ${b.patientName}`)}
                        >
                          <Send size={13} /> Send Reminder
                        </button>
                        <button
                          className="btn btn-emerald btn-sm"
                          onClick={() => markBillPaid(b.invoiceNo)}
                        >
                          Collect Payment
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Reports & Refunds + Bar Chart + Line Chart for Revenue vs Expenses */}
      {billingSubTab === 'refunds' && (
        <div className="space-y-4">
          {/* Revenue vs Expenses Combo Chart (Bar + Line) */}
          <div className="content-card p-4">
            <div className="card-header-bar mb-3">
              <div className="card-header-title">
                <BarChart3 size={18} className="text-teal" />
                <div>
                  <h3>Hospital Revenue vs Operating Expenses (₦)</h3>
                  <p className="card-subtext">Monthly comparison of total hospital receipts against clinical operating costs</p>
                </div>
              </div>
              <span className="badge badge-success">Jul Net Margin: ₦1.58M</span>
            </div>
            <RevenueExpenseChartWidget data={revenueVsExpensesData} />
          </div>

          <div className="content-card">
            <div className="card-header-bar">
              <div className="card-header-title">
                <RotateCcw size={18} className="text-teal" />
                <div>
                  <h3>Disbursed Patient Refunds</h3>
                  <p className="card-subtext">Cancelled procedure reversals and medication refund ledger</p>
                </div>
              </div>
              <span className="badge badge-info">₦{totalRefunds.toLocaleString()} Total Refunded</span>
            </div>

            <div className="table-responsive">
              <table className="naira-table">
                <thead>
                  <tr>
                    <th>Refund ID</th>
                    <th>Original Invoice</th>
                    <th>Patient Name</th>
                    <th>Reason for Refund</th>
                    <th>Authorized By</th>
                    <th>Date</th>
                    <th className="text-right">Refund Amount (₦)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {refunds.map((r) => (
                    <tr key={r.refundId}>
                      <td className="font-mono text-teal font-bold">{r.refundId}</td>
                      <td className="font-mono">{r.invoiceNo}</td>
                      <td><strong>{r.patient}</strong></td>
                      <td className="text-sm">{r.reason}</td>
                      <td>{r.approvedBy}</td>
                      <td className="font-mono">{r.date}</td>
                      <td className="text-right font-mono font-bold text-rose">₦{r.amount.toLocaleString()}</td>
                      <td>
                        <span className="badge badge-success">{r.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
