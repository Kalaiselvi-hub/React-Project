import React, { useState } from 'react';
import { X, Receipt, Plus, Trash2 } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const CreateBillModal = () => {
  const { isCreateBillModalOpen, setIsCreateBillModalOpen, createBill, patients, charges } = useHospital();

  const [patientName, setPatientName] = useState('');
  const [patientId, setPatientId] = useState('PAT-1001');
  const [method, setMethod] = useState('POS Card Payment');
  const [isPaidDirectly, setIsPaidDirectly] = useState(true);

  const [items, setItems] = useState([
    { name: 'Specialist Consultant Consultation', qty: 1, rate: 25000 },
    { name: 'Complete Blood Count (FBC + Diff)', qty: 1, rate: 8500 }
  ]);

  if (!isCreateBillModalOpen) return null;

  const handleAddItem = () => {
    setItems([...items, { name: 'General Doctor Consultation', qty: 1, rate: 10000 }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, idx) => idx !== index));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    if (field === 'service') {
      const selected = charges.find((c) => c.service === value);
      updated[index].name = value;
      if (selected) updated[index].rate = selected.fee;
    } else if (field === 'qty') {
      updated[index].qty = Math.max(1, parseInt(value, 10) || 1);
    } else if (field === 'rate') {
      updated[index].rate = Math.max(0, parseInt(value, 10) || 0);
    }
    setItems(updated);
  };

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const vat = Math.round(subtotal * 0.075);
  const grandTotal = subtotal + vat;

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalPatientName = patientName || 'Adewale Tinubu';
    createBill({
      patientName: finalPatientName,
      patientId,
      items,
      method,
      isPaidDirectly
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box modal-lg animate-scaleIn">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Receipt size={20} className="text-teal" />
            <h3 className="modal-title">Generate Hospital Bill & Invoice</h3>
          </div>
          <button className="modal-close-btn" onClick={() => setIsCreateBillModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-grid mb-4">
            <div className="form-group">
              <label>Select Admitted Patient or Type Name *</label>
              <input
                type="text"
                list="patientListOptions"
                placeholder="Type patient name or pick from list"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="form-control"
              />
              <datalist id="patientListOptions">
                {patients.map((p) => (
                  <option key={p.id} value={p.name}>{p.id} - {p.name}</option>
                ))}
              </datalist>
            </div>

            <div className="form-group">
              <label>Payment Method *</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="form-control"
              >
                <option value="POS Card Payment">POS Terminal (Card)</option>
                <option value="Bank Transfer (GTBank)">Bank Transfer (GTBank NIP)</option>
                <option value="Bank Transfer (Zenith)">Bank Transfer (Zenith Bank)</option>
                <option value="Cash Deposit">Hospital Cashier Desk</option>
                <option value="HMO Insurance (Leadway)">Leadway Health HMO</option>
                <option value="HMO Insurance (AXA Mansard)">AXA Mansard HMO</option>
                <option value="National Health (NHIS)">NHIS Health Scheme</option>
              </select>
            </div>
          </div>

          {/* Itemized Line Items */}
          <div className="line-items-wrapper">
            <div className="line-items-header">
              <span className="col-desc">Service / Treatment Description</span>
              <span className="col-qty">Qty</span>
              <span className="col-rate">Rate (₦)</span>
              <span className="col-total">Line Total (₦)</span>
              <span className="col-del"></span>
            </div>

            {items.map((item, idx) => (
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
                    step="500"
                    value={item.rate}
                    onChange={(e) => handleItemChange(idx, 'rate', e.target.value)}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="col-total font-mono font-bold">
                  ₦{(item.qty * item.rate).toLocaleString()}
                </div>
                <div className="col-del">
                  {items.length > 1 && (
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
              <Plus size={14} /> Add Another Service Line
            </button>
          </div>

          {/* Totals Summary */}
          <div className="invoice-totals-card">
            <div className="totals-row">
              <span>Subtotal:</span>
              <span className="font-mono">₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="totals-row">
              <span>Hospital VAT (7.5%):</span>
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
                  checked={isPaidDirectly}
                  onChange={(e) => setIsPaidDirectly(e.target.checked)}
                />
                <span>Collect & Mark as Paid Immediately</span>
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsCreateBillModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-teal-primary">
              Generate & Record Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
