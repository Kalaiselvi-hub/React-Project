import React from 'react';
import { X, Printer, CheckCircle2, ShieldAlert, HeartPulse, Download } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const InvoiceDetailModal = () => {
  const { selectedInvoice, isInvoiceModalOpen, setIsInvoiceModalOpen, markBillPaid } = useHospital();

  if (!isInvoiceModalOpen || !selectedInvoice) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box modal-lg animate-scaleIn">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <HeartPulse size={20} className="text-teal" />
            <h3 className="modal-title">Official Hospital Invoice</h3>
          </div>
          <button className="modal-close-btn" onClick={() => setIsInvoiceModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body printable-invoice-body">
          {/* Invoice Header */}
          <div className="invoice-print-header">
            <div className="hospital-brand-meta">
              <div className="invoice-logo">
                <HeartPulse size={30} color="#00C2FF" />
                <span className="logo-text">NAIRA HOSPITAL</span>
              </div>
              <p className="hospital-address">
                NAIRA Specialist Hospital & Medical Centre<br />
                Victoria Island, Lagos, Nigeria<br />
                Tel: +234 800 NAIRA (62472) • accounts@nairahospital.ng
              </p>
            </div>

            <div className="invoice-meta-block">
              <div className="invoice-number-tag">{selectedInvoice.invoiceNo}</div>
              <div className="invoice-meta-line">
                <span>Date:</span> <strong>{selectedInvoice.date}</strong>
              </div>
              <div className="invoice-meta-line">
                <span>Payment Method:</span> <strong>{selectedInvoice.method}</strong>
              </div>
              <div className="invoice-status-stamp">
                <span className={`status-stamp stamp-${selectedInvoice.status.toLowerCase()}`}>
                  {selectedInvoice.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Billed To Patient */}
          <div className="patient-billed-to-box">
            <span className="billed-label">Billed To Patient:</span>
            <div className="billed-name">{selectedInvoice.patientName}</div>
            <div className="billed-id">Patient File Ref: {selectedInvoice.patientId || 'General Outpatient'}</div>
          </div>

          {/* Line Items Table */}
          <table className="invoice-items-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Service / Treatment Description</th>
                <th className="text-center">Qty</th>
                <th className="text-right">Unit Price (₦)</th>
                <th className="text-right">Total (₦)</th>
              </tr>
            </thead>
            <tbody>
              {selectedInvoice.items && selectedInvoice.items.length > 0 ? (
                selectedInvoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td className="text-center">{item.qty}</td>
                    <td className="text-right font-mono">₦{item.rate.toLocaleString()}</td>
                    <td className="text-right font-mono font-bold">₦{(item.qty * item.rate).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>1</td>
                  <td>{selectedInvoice.services}</td>
                  <td className="text-center">1</td>
                  <td className="text-right font-mono">₦{selectedInvoice.amount.toLocaleString()}</td>
                  <td className="text-right font-mono font-bold">₦{selectedInvoice.amount.toLocaleString()}</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Invoice Summary */}
          <div className="invoice-summary-grid">
            <div className="invoice-notes-area">
              <strong>Payment Policy & Notes:</strong>
              <p>
                All hospital treatments are subject to standard clinical guidelines.
                Payments made via GTBank NIP, POS, or recognized HMO partner networks.
                This document is a certified computer-generated hospital receipt.
              </p>
            </div>

            <div className="invoice-calculation-block">
              <div className="calc-row">
                <span>Total Amount:</span>
                <span className="font-mono">₦{selectedInvoice.amount.toLocaleString()}</span>
              </div>
              <div className="calc-row">
                <span>Amount Paid:</span>
                <span className="font-mono text-emerald">₦{selectedInvoice.paid.toLocaleString()}</span>
              </div>
              <div className="calc-row due-row">
                <span>Outstanding Due:</span>
                <span className="font-mono text-rose font-bold">₦{selectedInvoice.due.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          {selectedInvoice.status !== 'Paid' && (
            <button
              type="button"
              className="btn btn-emerald"
              onClick={() => markBillPaid(selectedInvoice.invoiceNo)}
            >
              <CheckCircle2 size={16} /> Mark as Paid (₦{selectedInvoice.due.toLocaleString()})
            </button>
          )}
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => window.print()}
          >
            <Printer size={16} /> Print Official Receipt
          </button>
          <button
            type="button"
            className="btn btn-teal-primary"
            onClick={() => setIsInvoiceModalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
